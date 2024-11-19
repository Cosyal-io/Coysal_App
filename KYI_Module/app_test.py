import requests

url = "http://0.0.0.0:8000/generate_session"
payload = {
    "username": "testuser",
    "email": "testuser@example.com"
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    print("Response JSON:", response.json())
else:
    print("Failed to generate session:", response.status_code, response.text)