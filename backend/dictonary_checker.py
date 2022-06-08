import urllib.request
import urllib.error


APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"


def is_dictionary_entry(word: str) -> bool:
    api_reqest = urllib.request.Request(f"{APIURL}{word}")
    try:
        with urllib.request.urlopen(api_reqest) as response:
            if response.status != 404:
                return True
    except urllib.error.HTTPError as e:
        return False


if __name__ == "__main__":
    print(is_dictionary_entry("test"))
    print(is_dictionary_entry("alsjdl"))
