import numpy as np
import matplotlib.pyplot as plt
import pymongo
myclient = pymongo.MongoClient('mongodb://localhost:27017')
mydb = myclient["mydb"]
mycol = mydb["customers"]
print("hello...")
mydict = {"name": "saiyam", "address": "airport"}

x = mycol.insert_one(mydict)


xpoints = np.array([1, 8])
ypoints = np.array([3, 10])

plt.plot(xpoints, ypoints)
plt.savefig('./public/myfig1.png')
# mydict2 = {"name": "photographer",
#            "address": "library",
#            "images": "myfig1.png"}
plt.show()
