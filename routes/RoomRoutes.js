const express = require("express");
const router = express.Router();
const Room = require("../Models/RoomSchema");

router.get("/", async (req, res) => {
  const rooms = await Room.where();
  let passwords;
const filteredRooms =  rooms.map((item)=>{
      const {password,users,...other} = item._doc
        return other;
    }
  )
  res.json(filteredRooms);
});

router.post("/", async (req, res) => {
    const rooms = await Room.create({
        name: req.body.name,
        password: req.body.password,
        creator: req.body.username,
    });
    console.log(rooms)
    res.json(rooms);
});


module.exports = router;
