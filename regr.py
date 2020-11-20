from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def init_params():
    from json import load
    with open('params.json', 'r', encoding='utf-8') as fh:
        return load(fh)


class MyRegr():
    def __init__(self, days):
        params = init_params()
        self.days = days
        self.path_to_file = params['data']['archive']
        # self.path_to_file = "archive.csv"
        self.data = pd.read_csv(self.path_to_file)
        self.data.rename(columns=lambda x: x.replace(' ', ''), inplace=True)
        self.ru = self.data.loc[self.data['Country_code'] == 'RU']
        self.ru = self.ru.drop(
            ['Date_reported', 'Country_code', 'Country', 'WHO_region', 'New_cases', 'New_deaths', 'Cumulative_deaths'],
            axis=1)
        self.ru = self.ru.tail(self.days)
        self.y = self.ru.to_numpy()
        self.x = np.linspace(1, self.days, self.days).reshape(-1, 1)

    def result_fit(self):
        reg = LinearRegression().fit(self.x, self.y)
        return int(reg.predict(np.array([8]).reshape(-1, 1)))

    def get_array_data(self):
        a = [self.x.T.tolist()[0], self.y.T.tolist()[0]]
        return a

    def get_archive_data(self):
        import json
        new_data = self.data[self.data['Country_code'] == 'RU']
        array = []
        for elem in new_data['Cumulative_cases'].tail(22):
            array.append(elem)
        return array

    def get_data_from_api(self):
        with open('data.json', 'r') as file:
            return file.read()

    def get_predict(self):
        array_predicted = [22032, 22954, 23268]


        return array_predicted