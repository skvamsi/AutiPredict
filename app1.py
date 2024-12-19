import warnings
warnings.filterwarnings("ignore", category=UserWarning, message="X does not have valid feature names, but .*")

from flask import Flask, render_template, request
import pickle
import numpy as np
app=Flask(__name__)

@app.route('/')
def hello_world():
    
        return render_template('form1.html')
@app.route('/predict',methods=['POST','GET'])
def predict():
        print(request.form)
        int_features=list(request.form.values())
        print(int_features)
        ethnicity=['White European', 'Asian','Middle Eastern', 'South Asian','Black','Hispanic' , 'others'  , 'Latino', 'PaciFica','Mixed','Native Indian']
        who=['Family member','Health care','School & NGO','Self','Others']

        
        if int_features[22]  in who:
                ind = int_features.index(int_features[22])
                rep = who.index(int_features[22])
                int_features.pop(ind)
                for j in range(ind, ind + len(who)):
                        if j == ind + rep:
                                int_features.insert(j, '1')
                        else:
                                int_features.insert(j, '0')
        if int_features[21] in ethnicity:
                inn = int_features.index(int_features[21])
                repp = ethnicity.index(int_features[21])
                int_features.pop(inn)
                for j in range(inn, inn + len(ethnicity)):
                        if j == inn + repp:
                                int_features.insert(j, '1')
                        else:
                                int_features.insert(j, '0')
        
        
        if int_features[20] == 'Male':
                ind = int_features.index('Male')
                int_features.pop(ind)
                int_features.insert(ind, '0')
                int_features.insert(ind + 1, '1')
        if int_features[20] == 'Female':
                ind = int_features.index('Female')
                int_features.pop(ind)
                int_features.insert(ind, '1')
                int_features.insert(ind + 1, '0')

        m=int_features.pop()
        if(m=='GaussianNB'):
                print("in")
                model=pickle.load(open("naive_bayes.pkl",'rb'))
        else:
                model=pickle.load(open("autism_dt.pkl",'rb'))

        
        int_features=[int(x) for x in int_features]
        
        input=np.array([int_features])
        print(input)
        prediction=model.predict_proba(input)
        print(prediction)
        output="{0:.{1}f}".format(prediction[0][1]*100, 2)
        print(output)
      
       
       

        if float(output) > (0.5):
                return render_template('form1.html', pred='Signs of Rett Syndrome detected. Probability: {}%'.format(output))
        else:
                return render_template('form1.html', pred='No signs of Rett Syndrome detected. Probability: {}%'.format(output))


if __name__ == '__main__':
        app.run(debug=True)
        
        


                        
    