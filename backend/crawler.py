import requests
import trafilatura


def extract_page(url):
    downloaded = trafilatura.fetch_url(url)

    if not downloaded:
        return None

    text = trafilatura.extract(downloaded)

    return text


if __name__ == "__main__":
    url = "https://www.hubspot.com"

    content = extract_page(url)

    if content:
        print(content[:3000])
    else:
        print("Failed to extract content")