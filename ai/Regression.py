import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error 

data = pd.read_csv("market.csv")

y = data["Close"]

x = data.drop(columns=['Date','Close','Total Trade Quantity','Turnover (Lacs)'])

train_x , test_x , train_y , test_y = train_test_split(x,y,test_size=0.15)

regression = LinearRegression()

regression.fit(train_x,train_y)

predected_y = regression.predict(test_x)

print(regression.coef_)
print(mean_squared_error(test_y,predected_y))

visualisation_resultat = pd.DataFrame({"real values :":test_y,"predected :" : predected_y})

print(visualisation_resultat)

