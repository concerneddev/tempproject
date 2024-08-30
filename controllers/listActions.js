import { Tourist } from "../models/Tourist.js";
import { Guide } from "../models/Guide.js";
import { List } from "../models/List.js";

/*
{
    "listtitle": "listone",
    "location": "location",
    "specialities": ["specialityone", "specialitytwo", "specialitythree"],
    "experience": "experience paragraph"
}
 */
export const listCreate = async (req, res) => {
  try {
    // check if user is logged in
    if (!req.decodedUserId) {
      return res.status(401).send({ message: "Access denied." });
    }

    // get the User object
    const guideId = req.decodedUserId;
    let guide = await Guide.findById(guideId);
    if (!guide) {
      return res.status(401).send({ message: "Register first." });
    }

    const { listtitle, location, specialities, experience } = req.body;

    // Check for missing fields
    if (!listtitle || !location || !specialities || !experience) {
      return res.status(400).send({
        message:
          "Please provide all required fields: listtitle, location, specialities, experience.",
      });
    }

    // Check if the list already exists
    let list = await List.findOne({ listTitle: listtitle });
    if (list) {
      return res.status(404).send({ message: "List already exists." });
    } else {
      // Create the list
      list = await List.create({
        listTitle: listtitle,
        guideData: {
          guide: guideId,
          location: location,
          specialities: Array.isArray(specialities)
            ? specialities
            : [specialities], // Ensure it's an array
          experience: experience,
        },
        touristData: [], // Initialize as an empty array
        liststatus: true,
      });

      // Add the new list ID to the guide's lists array
      guide.lists.push(list._id);

      // Save the updated guide
      await guide.save();

      return res
        .status(201)
        .send({ message: "List created successfully", list, guide });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};

/*
{
    "datefrom": "2024-09-01",
    "dateto": "2024-09-07"
}
*/
export const listRegister = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.decodedUserId) {
      return res.status(401).send({ message: "Access denied." });
    }

    // Get the Guide object
    const touristId = req.decodedUserId;
    console.log(touristId);
    let tourist = await Tourist.findById(touristId);
    console.log(tourist);
    if (!tourist) {
      return res.status(401).send({ message: "Register first." });
    }

    const { datefrom, dateto } = req.body;

    // Check for missing fields
    if (!datefrom || !dateto) {
      return res.status(400).send({
        message: "Please provide both datefrom and dateto.",
      });
    }

    // Regular expression to validate yyyy-mm-dd format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    // Validate date format
    if (!datePattern.test(datefrom) || !datePattern.test(dateto)) {
      return res.status(400).send({
        message: "Date fields must be in yyyy-mm-dd format.",
      });
    }

    // Convert dates to ISO strings
    const fromDate = new Date(datefrom).toISOString();
    const toDate = new Date(dateto).toISOString();

    // Check if the list exists
    const listId = req.params.listid;
    let list = await List.findById(listId);

    if (list.liststatus == false) {
      return res.status(400).send({ message: "List is closed. " });
    }

    if (!list) {
      return res.status(404).send({ message: "List not found." });
    } else {
      // Update existing list with the new tourist data
      list.touristData.push({
        tourist: touristId,
        datefrom: fromDate,
        dateto: toDate,
      });

      // Save the updated list
      list = await list.save();

      return res
        .status(200)
        .send({ message: "List updated successfully", list });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};

export const listStatusClose = async () => {
  try {
    // check if user is logged in
    if (!req.decodedUserId) {
      return res.status(401).send({ message: "Access denied." });
    }

    // get the User object
    const guideId = req.decodedUserId;
    let guide = await Guide.findById(guideId);
    if (!guide) {
      return res.status(401).send({ message: "Register first." });
    }

    // Check if the list exists
    const listId = req.params.listid;
    let list = await List.findById(listId);

    if (!list) {
      return res.status(404).send({ message: "List not found." });
    } else {
      // Update liststatus to false
      list.liststatus = false;

      // Save the updated list
      list = await list.save();

      return res
        .status(200)
        .send({ message: "List updated successfully", list });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};

export const listDisplayGuideList = async (req, res) => {
  try {
    // check if user is logged in
    if (!req.decodedUserId) {
      return res.status(401).send({ message: "Access denied." });
    }

    // get the User object
    const guideId = req.decodedUserId;
    let guide = await Guide.findById(guideId);
    if (!guide) {
      return res.status(401).send({ message: "Register first." });
    }

    const lists = await List.find();

    // Structure the list objects to remove redundant values
    const structuredLists = lists.map(list => ({
        _id: list._id,
        listTitle: list.listTitle,
        guideData: list.guideData,
        touristData: list.touristData.map(tourist => ({
          tourist: tourist.tourist,
          datefrom: tourist.datefrom,
          dateto: tourist.dateto
        })),
        liststatus: list.liststatus
      }));
    
    return res.status(200).send({ message: "Lists retrieved successfully", lists: structuredLists });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};

export const listDisplayGuideDetail = async (req, res) => {
  try {

  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};

export const listDisplayTouristList = () => {};

export const listDisplayTouristDetail = () => {};
