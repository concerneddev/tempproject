import { Tourist } from "../models/Tourist.js";
import { Guide } from "../models/Guide.js";
import { List } from "../models/List.js";

export const dashboardGuide = async (req, res) => {
  try {
    // check if user is logged in
    if (!req.decodedUserId) {
      return res.status(401).send({ message: "Access denied." });
    }

    // get the User object
    const guideId = req.decodedUserId;
    let guide = await Guide.findById(guideId).populate("lists");
    console.log(guide);
    if (!guide) {
      return res.status(401).send({ message: "Register first." });
    }

    let guideData = {
      guideId: guide._id,
      guideFirstName: guide.firstname,
      guideLastName: guide.lastname,
      guideEmailId: guide.emailid,
      guidePhoneNo: guide.phonenumber,
      guideExperience: guide.experience,
    };
    let lists = guide.lists;

    // Structure the list objects to remove redundant values
    const structuredLists = lists.map((list) => ({
      _id: list._id,
      listTitle: list.listTitle,
      listLocation: list.guideData.location,
      guideId: list.guideData.guide._id,
      guideFirstName: list.guideData.guide.firstname,
      guideLastName: list.guideData.guide.lastname,
      guideEmailId: list.guideData.guide.emailid,
      guidePhoneNo: list.guideData.guide.phonenumber,
      touristsRegistered: list.touristData.length,
      listDescription: list.description,
      liststatus: list.liststatus,
    }));

    return res.status(200).send({
      guideData: guideData,
      lists: structuredLists,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};

export const dashboardTourist = async (req, res) => {
  try {
    // check if user is logged in
    if (!req.decodedUserId) {
      return res.status(401).send({ message: "Access denied." });
    }

    // get the User object
    const touristId = req.decodedUserId;
    let tourist = await Tourist.findById(touristId).populate("lists");
    if (!tourist) {
      return res.status(401).send({ message: "Register first." });
    }

    let touristData = {
      touristId: tourist._id,
      touristFirstName: tourist.firstname,
      touristLastName: tourist.lastname,
      touristEmailId: tourist.emailid,
      touristPhoneNo: tourist.phonenumber,
    };
    let lists = tourist.lists;

    // Structure the list objects to remove redundant values
    const structuredLists = lists.map((list) => ({
      _id: list._id,
      listTitle: list.listTitle,
      listLocation: list.guideData.location,
      guideId: list.guideData.guide._id,
      guideFirstName: list.guideData.guide.firstname,
      guideLastName: list.guideData.guide.lastname,
      guideEmailId: list.guideData.guide.emailid,
      guidePhoneNo: list.guideData.guide.phonenumber,
      touristsRegistered: list.touristData.length,
      listDescription: list.description,
      liststatus: list.liststatus,
    }));

    return res.status(200).send({
      touristData: touristData,
      mylists: structuredLists,
    });
  } catch(error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};
