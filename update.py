import re

file_path = r'd:\octopi-project\ghlevelup\src\data\industries.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '"Tax Preparation"': '"CRM Setup & Management", "Workflow Automation", "Email & SMS Marketing", "Website & Landing Pages"',
    '"Accounting"': '"CRM Setup & Management", "Workflow Automation", "Reporting Dashboards", "White-Label Solutions"',
    '"Bookkeeper"': '"CRM Setup & Management", "Workflow Automation", "Reporting Dashboards", "Email & SMS Marketing"',
    '"Notary"': '"Workflow Automation", "Website & Landing Pages", "Email & SMS Marketing", "CRM Setup & Management"',
    '"Mortgage Broker"': '"CRM Setup & Management", "Funnel Builds", "Workflow Automation", "Email & SMS Marketing"',
    '"Realtor"': '"AI Voice & Chat Agents", "CRM Setup & Management", "Funnel Builds", "Social Media Management"',
    '"Insurance Agent"': '"CRM Setup & Management", "Workflow Automation", "Email & SMS Marketing", "Funnel Builds"',
    '"Financial Advisor"': '"CRM Setup & Management", "Workflow Automation", "Email & SMS Marketing", "Website & Landing Pages"',
    '"Investment Banker"': '"CRM Setup & Management", "Workflow Automation", "Reporting Dashboards", "API Integrations"',
    '"Credit Specialist"': '"CRM Setup & Management", "Funnel Builds", "Workflow Automation", "AI Voice & Chat Agents"',
    '"Consultant"': '"Funnel Builds", "Website & Landing Pages", "CRM Setup & Management", "Workflow Automation"',
    '"Attorney"': '"AI Voice & Chat Agents", "CRM Setup & Management", "Workflow Automation", "Website & Landing Pages"',
    '"CPA"': '"CRM Setup & Management", "Workflow Automation", "Reporting Dashboards", "Email & SMS Marketing"',
    '"Roofer"': '"AI Voice & Chat Agents", "CRM Setup & Management", "Email & SMS Marketing", "Website & Landing Pages"',
    '"Retailer"': '"Email & SMS Marketing", "Social Media Management", "Funnel Builds", "CRM Setup & Management"',
    '"Medical"': '"AI Voice & Chat Agents", "Workflow Automation", "CRM Setup & Management", "Email & SMS Marketing"',
    '"Marketing Agency"': '"White-Label Solutions", "Funnel Builds", "Workflow Automation", "Reporting Dashboards"',
    '"Logistics"': '"API Integrations", "Workflow Automation", "CRM Setup & Management", "Reporting Dashboards"'
}

for name, services in replacements.items():
    pattern = r'(name:\s*' + name + r'.*?roi:\s*"[^"]+")(\s*\n\s*\}\n\s*\})'
    replacement = r'\1,\n      services: [' + services + r']\2'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
