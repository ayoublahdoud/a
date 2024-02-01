import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score,confusion_matrix
from sklearn.ensemble import RandomForestClassifier

data = pd.read_csv("heart.csv")


y = data["target"]
x = data.drop(columns=['target'])

train_x , test_x , train_y , test_y = train_test_split(x,y,test_size=0.15)

RFC = RandomForestClassifier()
RFC.fit(train_x,train_y)

predected_y = RFC.predict(test_x)

visualisation_resultat = pd.DataFrame({"real values :":test_y,"predected :" : predected_y})

print(visualisation_resultat)
print(accuracy_score(test_y,predected_y))
print(confusion_matrix(test_y,predected_y))