import os
import json
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def analyze_positioning_change(page_text, old_positioning, new_positioning):
    prompt = f"""
You are analyzing website copy for a marketing repositioning project.

The company is changing its positioning.

OLD POSITIONING:
{old_positioning}

NEW POSITIONING:
{new_positioning}

Analyze the website content below.

Return valid JSON only with this structure:
{{
  "is_impacted": true,
  "impact_level": "High | Medium | Low | None",
  "confidence": 0,
  "reason": "",
  "old_messaging_examples": [
    ""
  ],
  "suggested_rewrites": [
    {{
      "before": "",
      "after": "",
      "why": ""
    }}
  ],
  "estimated_manual_minutes": 0,
  "estimated_assisted_minutes": 0
}}

Website content:
\"\"\"
{page_text[:5000]}
\"\"\"
"""

    response = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=1200,
        temperature=0.2,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    content = response.content[0].text.strip()
 
    start = content.find("{")
    end = content.rfind("}") + 1

    if start == -1 or end == 0:
        raise ValueError("No JSON object found in Claude response")

    json_text = content[start:end]

    try:
        return json.loads(json_text)
    except json.JSONDecodeError:
        repair_prompt = f"""
Fix this into valid JSON only. Do not add commentary. Do not use markdown.

Required schema:
{{
  "is_impacted": true,
  "impact_level": "High",
  "confidence": 0.95,
  "reason": "short explanation",
  "old_messaging_examples": [],
  "suggested_rewrites": [],
  "effort_estimate": "short effort estimate"
}}

Broken JSON:
{json_text}
"""

        repair_response = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=1200,
            temperature=0,
            messages=[
                {
                    "role": "user",
                    "content": repair_prompt,
                }
            ],
        )

        repaired_content = repair_response.content[0].text.strip()
        repaired_start = repaired_content.find("{")
        repaired_end = repaired_content.rfind("}") + 1
        repaired_json = repaired_content[repaired_start:repaired_end]

        return json.loads(repaired_json)


if __name__ == "__main__":
    from crawler import extract_page

    url = "https://www.hubspot.com"
    page_text = extract_page(url)

    result = analyze_positioning_change(
        page_text=page_text,
        old_positioning="customer platform for go-to-market teams",
        new_positioning="AI content operations platform for marketing teams",
    )

    print(json.dumps(result, indent=2))