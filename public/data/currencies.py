import os
import requests
import json

# Get the directory where the Python script is located
script_directory = os.path.dirname(os.path.abspath(__file__))

# Specify the file path relative to the script's directory
file_path = os.path.join(script_directory, "exchange_rates.json")

url = "https://api.apilayer.com/exchangerates_data/latest?symbols=ETB&base=USD"  # Remove the "symbols" parameter

payload = {}
headers = {
    "apikey": "mTCITByknx60Lm0zpzNALooB0HI4AP76"
}

response = requests.request("GET", url, headers=headers, data=payload)

status_code = response.status_code
result = response.json()  # Parse the response as JSON

if status_code == 200:
    base_currency = "USD"
    currencies = result.get("rates", {})  # Get the rates dictionary

    # Create a dictionary to store the exchange rates
    exchange_rates = {"base": base_currency, "rates": currencies}

    # Save the data to a JSON file in the script's directory
    with open(file_path, "w") as json_file:
        json.dump(exchange_rates, json_file, indent=4)

    print(f"Exchange rates saved to {file_path}")
else:
    print(f"Request failed with status code: {status_code}")
