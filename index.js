const express = require("express");
const app = express();
const cors = require('cors')
require("./Db");
const User = require("./user");
const dailyNews = require("./dailyupdates");
const newsData = require("./DemoNewsData");
const iplData = require("./iplData");

app.use(cors());
app.use(express.json({limit:'50mb'}))

app.get("/", async(req ,resp) => {
    resp.send("welcome to my news section")
});


app.get("/getnews" , async(req , resp) => {
    const data = await User.find({});
    resp.send({
        status:'success',
        ststuscode:200,
        message:"Data fetchd Successfully",
        data:data
    })
});

app.get("/getDailyUpdates", async(req , resp) => {
    const data = await dailyNews.find({});
    // console.log("news updates data : ",data);
        resp.send({
            status:'success',
            ststuscode:200,
            message:"Data fetchd Successfully",
            data:data
        })
});

app.post("/insertData", async(req , resp) => {
    const data = req.body;
    console.log("data is : ",data)
    const insertNews = new dailyNews(data);
    const saveData = await insertNews.save();

    console.log(saveData);

    resp.send({message:"Data inserted successfully"})
})

app.get("/findNews/:id" , async(req , resp) => {
    const data = req.params.id;
    const getdata = await dailyNews.findOne({_id:data});
    if(getdata){
        resp.send({
            status:'success',
            ststuscode:200,
            message:"Data fetchd Successfully",
            data:getdata
        })
    }else{
        resp.send({
            status:'error',
            ststuscode:200,
            message:"No Record Found",
        })
    }

    console.log("req data : ",getdata);
});



app.post("/getCategory" , async(req , resp) => {

    const category = req.body?.newsCat?.toLowerCase();
    console.log("category req : ",category);
    if(!category){
        resp.send({
            status:"error",
            statuscode:200,
            message:"Please Provide a Valid Category"
        })
        return;
    }

    const getCategory = await dailyNews.find({category:category})

    // if(getCategory?.length != 0){
        resp.send({
            status:"success",
            statuscode:200,
            message:"Data Found",
            data:getCategory
        })
    // }

})


app.get("/getDummyData/:q", async(req , resp) => {
    console.log("news data : ",);
    const category = req.params.q;

    if(category == "ipl"){
        resp.send({
            "status":"success",
            "statuscode":200,
            "message":"Data fetched Successfully",
            "data":iplData

        })
    }else{
        resp.status(200).send({
                    status:"success",
                    statuscode:200,
                    message:"Data Fetched successfully",
                    data:newsData
                })
    }


    // if(newsData?.length > 1){
    //     resp.status(200).send({
    //         status:"success",
    //         statuscode:200,
    //         message:"Data Fetched successfully",
    //         data:newsData
    //     })
    // }else{
    //     resp.status(200).send({
    //         status:"success",
    //         statuscode:200,
    //         message:"No Record Found",
    //     })
    // }
})


app.get("/getDummyData", async(req , resp) => {

    if(newsData?.length > 1){
        if(category == "ipl"){
            resp.send({
                "status":"success",
                "statuscode":200,
                "message":"Data fetched Successfully",
                "data":iplData
    
            })
        }

    }else{
        resp.status(200).send({
                    status:"error",
                    statuscode:200,
                    message:"No record found",
                })
    }
})



const port = 3005;
app.listen(port,() => {
    console.log(`Server is now running on PORT ${port}`)
});

