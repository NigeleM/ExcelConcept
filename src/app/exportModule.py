import pandas as pd
import numpy as np
import openpyxl
import json
filePath = input('Enter the file or file Path of the file : ')

file = pd.read_excel(filePath)

ColumnDefs = []

for column in file.columns:
    ColumnDefs.append({'field': column, 'editable': 'true','sortable': 'true', 'filter': 'true'})

with open("columns.json", "w") as json_file:
    json.dump(ColumnDefs, json_file)

listofJson = file.to_json(orient='records', lines=True).splitlines()

with open("rows.json", "w") as json_file:
  json_file.write(f'{listofJson}')
