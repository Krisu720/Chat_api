const express = require("express");
const router = express.Router();
const Room = require("../Models/RoomSchema");

router.get("/", async (req, res) => {
  const rooms = await Room.where();
  let passwords;
const filteredRooms =  rooms.map((item)=>{
      const {password,users,secret,...other} = item._doc
        return other;
    }
  )
  res.json(filteredRooms);
});

router.post('/join', async (req,res)=> {
    const rooms = await Room.findById(req.body._id)
    if(req.body.password===rooms.password) {
        res.json(rooms.secret)
    } else {
       res.status(401).json('wrong password')
    }
})

router.post("/", async (req, res) => {
    const chars = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890'
    let  key = '';
    
    for(let i=1;i<=16;i++) {
      const random = Math.round(Math.random()*37);
      key = key+chars.slice(random,random+1)
    }

    const rooms = await Room.create({
        name: req.body.name,
        password: req.body.password,
        creator: req.body.username,
        secret: key
    });
    console.log(rooms)
    res.json(rooms);
});


module.exports = router;
