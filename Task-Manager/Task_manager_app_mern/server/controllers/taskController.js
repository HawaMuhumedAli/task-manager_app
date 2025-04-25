// import Notice from "../models/notification.js"
// import Task from "../models/task.js"
// import User from "../models/user.js"

// // Function to create a new task
// export const createTask = async (req, res) => {
//     try {
//         const { userId } = req.user // Get the user ID from the request

//         const { title, team, stage, date, priority, assets } = req.body // Destructure the task details from the request body

//         let text = "New task has been assigned to you"
//         if (team?.length > 1) {
//             text = text + ` and ${team?.length - 1} others.` // Append text if the task is assigned to more than one person
//         }

//         text = text + ` The task priority is set at ${priority} priority, so check and act accordingly. The task date is ${new Date(date).toDateString()}. Thank you!!!`

//         const activity = {
//             type: "assigned",
//             activity: text,
//             by: userId,
//         }

//         const task = await Task.create({
//             title,
//             team,
//             stage: stage.toLowerCase(),
//             date,
//             priority: priority.toLowerCase(),
//             assets,
//             activities: activity,
//         })

//         await Notice.create({
//             team,
//             text,
//             task: task._id,
//         })

//         res.status(200).json({
//             status: true,
//             task,
//             message: "Task created successfully.",
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to duplicate an existing task
// export const duplicateTask = async (req, res) => {
//     try {
//         const { id } = req.params

//         const task = await Task.findById(id)

//         const newTask = await Task.create({
//             ...task._doc, // Spread operator to copy all properties of the existing task
//             title: task.title + " - Duplicate",
//         })

//         newTask.team = task.team
//         newTask.subTasks = task.subTasks
//         newTask.assets = task.assets
//         newTask.priority = task.priority
//         newTask.stage = task.stage

//         await newTask.save()

//         // Alert users of the new task
//         let text = "New task has been assigned to you"
//         if (task.team.length > 1) {
//             text = text + ` and ${task.team.length - 1} others.`
//         }

//         text = text + ` The task priority is set at ${task.priority} priority, so check and act accordingly. The task date is ${task.date.toDateString()}. Thank you!!!`

//         await Notice.create({
//             team: task.team,
//             text,
//             task: newTask._id,
//         })

//         res.status(200).json({
//             status: true,
//             message: "Task duplicated successfully.",
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to post an activity related to a task
// export const postTaskActivity = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { userId } = req.user
//         const { type, activity } = req.body

//         const task = await Task.findById(id)

//         const data = {
//             type,
//             activity,
//             by: userId,
//         }

//         task.activities.push(data)

//         await task.save()

//         res.status(200).json({
//             status: true,
//             message: "Activity posted successfully.",
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to get dashboard statistics
// export const dashboardStatistics = async (req, res) => {
//     try {
//         const { userId, isAdmin } = req.user

//         // Get all tasks for admin or only tasks assigned to the user
//         const allTasks = isAdmin
//             ? await Task.find({
//                   isTrashed: false,
//               })
//                   .populate({
//                       path: "team",
//                       select: "name role title email",
//                   })
//                   .sort({ _id: -1 })
//             : await Task.find({
//                   isTrashed: false,
//                   team: { $all: [userId] },
//               })
//                   .populate({
//                       path: "team",
//                       select: "name role title email",
//                   })
//                   .sort({ _id: -1 })

//         const users = await User.find({ isActive: true })
//             .select("name title role isAdmin createdAt")
//             .limit(10)
//             .sort({ _id: -1 })

//         // Group tasks by stage and calculate counts
//         const groupTasks = allTasks.reduce((result, task) => {
//             const stage = task.stage

//             if (!result[stage]) {
//                 result[stage] = 1
//             } else {
//                 result[stage] += 1
//             }

//             return result
//         }, {})

//         // Group tasks by priority
//         const groupData = Object.entries(
//             allTasks.reduce((result, task) => {
//                 const { priority } = task

//                 result[priority] = (result[priority] || 0) + 1
//                 return result
//             }, {})
//         ).map(([name, total]) => ({ name, total }))

//         // Calculate total tasks
//         const totalTasks = allTasks?.length
//         const last10Task = allTasks?.slice(0, 10)

//         const summary = {
//             totalTasks,
//             last10Task,
//             users: isAdmin ? users : [],
//             tasks: groupTasks,
//             graphData: groupData,
//         }

//         res.status(200).json({
//             status: true,
//             message: "Successfully",
//             ...summary,
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to get a list of tasks with optional filtering by stage and trash status
// export const getTasks = async (req, res) => {
//     try {
//         const { stage, isTrashed } = req.query

//         let query = { isTrashed: isTrashed ? true : false }

//         if (stage) {
//             query.stage = stage
//         }

//         let queryResult = Task.find(query)
//             .populate({
//                 path: "team",
//                 select: "name title email",
//             })
//             .sort({ _id: -1 })

//         const tasks = await queryResult

//         res.status(200).json({
//             status: true,
//             tasks,
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to get details of a single task by ID
// export const getTask = async (req, res) => {
//     try {
//         const { id } = req.params

//         const task = await Task.findById(id)
//             .populate({
//                 path: "team",
//                 select: "name title role email",
//             })
//             .populate({
//                 path: "activities.by",
//                 select: "name",
//             })

//         res.status(200).json({
//             status: true,
//             task,
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to create a sub-task under a specific task
// export const createSubTask = async (req, res) => {
//     try {
//         const { title, tag, date } = req.body
//         const { id } = req.params

//         const newSubTask = {
//             title,
//             date,
//             tag,
//         }

//         const task = await Task.findById(id)

//         task.subTasks.push(newSubTask)

//         await task.save()

//         res.status(200).json({
//             status: true,
//             message: "SubTask added successfully.",
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to update an existing task
// export const updateTask = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { title, date, team, stage, priority, assets } = req.body

//         const task = await Task.findById(id)

//         task.title = title
//         task.date = date
//         task.priority = priority.toLowerCase()
//         task.assets = assets
//         task.stage = stage.toLowerCase()
//         task.team = team

//         await task.save()

//         res.status(200).json({
//             status: true,
//             message: "Task updated successfully.",
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to mark a task as trashed
// export const trashTask = async (req, res) => {
//     try {
//         const { id } = req.params

//         const task = await Task.findById(id)

//         task.isTrashed = true

//         await task.save()

//         res.status(200).json({
//             status: true,
//             message: `Task trashed successfully.`,
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }

// // Function to delete or restore a task based on query parameters
// export const deleteRestoreTask = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { actionType } = req.query

//         if (actionType === "delete") {
//             await Task.findByIdAndDelete(id)
//         } else if (actionType === "deleteAll") {
//             await Task.deleteMany({ isTrashed: true })
//         } else if (actionType === "restore") {
//             const resp = await Task.findById(id)

//             resp.isTrashed = false
//             resp.save()
//         } else if (actionType === "restoreAll") {
//             await Task.updateMany(
//                 { isTrashed: true },
//                 { $set: { isTrashed: false } }
//             )
//         }

//         res.status(200).json({
//             status: true,
//             message: `Operation performed successfully.`,
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ status: false, message: error.message })
//     }
// }
import Notice from "../models/notification.js";
import Task from "../models/task.js";
import User from "../models/user.js";

// Create a new task
// export const createTask = async (req, res) => {
//     try {
//         if (!req.user || !req.user.userId) {
//             return res.status(401).json({ status: false, message: "Unauthorized: Missing user info" });
//         }

//         const { userId } = req.user;
//         const { title, team, stage, date, priority, assets } = req.body;

//         let text = "New task has been assigned to you";
//         if (team?.length > 1) {
//             text += ` and ${team.length - 1} others.`;
//         }
//         text += ` The task priority is set at ${priority} priority, so check and act accordingly. The task date is ${new Date(date).toDateString()}. Thank you!!!`;

//         const activity = { type: "assigned", activity: text, by: userId };

//         const task = await Task.create({
//             title,
//             team,
//             stage: stage.toLowerCase(),
//             date,
//             priority: priority.toLowerCase(),
//             assets,
//             activities: activity,
//         });

//         await Notice.create({ team, text, task: task._id });

//         res.status(200).json({ status: true, task, message: "Task created successfully." });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };
export const createTask = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ status: false, message: "Unauthorized: Missing user info" });
        }

        const userId = req.user._id; // <-- Correct field _id here
        const { title, team, stage, date, priority, assets } = req.body;

        let text = "New task has been assigned to you";
        if (team?.length > 1) {
            text += ` and ${team.length - 1} others.`;
        }
        text += ` The task priority is set at ${priority} priority, so check and act accordingly. The task date is ${new Date(date).toDateString()}. Thank you!!!`;

        const activity = { type: "assigned", activity: text, by: userId };

        const task = await Task.create({
            title,
            team,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
            activities: activity,
        });

        await Notice.create({ team, text, task: task._id });

        res.status(200).json({ status: true, task, message: "Task created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// Duplicate an existing task
export const duplicateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        const newTask = await Task.create({
            ...task._doc,
            title: task.title + " - Duplicate",
        });

        let text = "New task has been assigned to you";
        if (task.team.length > 1) {
            text += ` and ${task.team.length - 1} others.`;
        }
        text += ` The task priority is set at ${task.priority} priority, so check and act accordingly. The task date is ${task.date.toDateString()}. Thank you!!!`;

        await Notice.create({ team: task.team, text, task: newTask._id });

        res.status(200).json({ status: true, message: "Task duplicated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// Post task activity
// export const postTaskActivity = async (req, res) => {
//     try {
//         if (!req.user?.userId) return res.status(401).json({ status: false, message: "Unauthorized" });

//         const { id } = req.params;
//         const { userId } = req.user;
//         const { type, activity } = req.body;

//         const task = await Task.findById(id);
//         task.activities.push({ type, activity, by: userId });

//         await task.save();
//         res.status(200).json({ status: true, message: "Activity posted successfully." });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };
export const postTaskActivity = async (req, res) => {
    try {
      if (!req.user?._id)
        return res.status(401).json({ status: false, message: "Unauthorized" });
  
      const { id } = req.params;
      const userId = req.user._id; // ✅ fixed this
  
      const { type, activity } = req.body;
  
      const task = await Task.findById(id);
      task.activities.push({ type, activity, by: userId });
  
      await task.save();
      res.status(200).json({ status: true, message: "Activity posted successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error.message });
    }
  };
  
// Dashboard statistics
// export const dashboardStatistics = async (req, res) => {
//     try {
//         if (!req.user?.userId) return res.status(401).json({ status: false, message: "Unauthorized" });

//         const { userId, isAdmin } = req.user;

//         const allTasks = isAdmin
//             ? await Task.find({ isTrashed: false }).populate("team", "name role title email").sort({ _id: -1 })
//             : await Task.find({ isTrashed: false, team: { $all: [userId] } }).populate("team", "name role title email").sort({ _id: -1 });

//         const users = isAdmin
//             ? await User.find({ isActive: true }).select("name title role isAdmin createdAt").limit(10).sort({ _id: -1 })
//             : [];

//         const groupTasks = allTasks.reduce((result, task) => {
//             result[task.stage] = (result[task.stage] || 0) + 1;
//             return result;
//         }, {});

//         const graphData = Object.entries(
//             allTasks.reduce((result, task) => {
//                 result[task.priority] = (result[task.priority] || 0) + 1;
//                 return result;
//             }, {})
//         ).map(([name, total]) => ({ name, total }));

//         res.status(200).json({
//             status: true,
//             message: "Successfully",
//             totalTasks: allTasks.length,
//             last10Task: allTasks.slice(0, 10),
//             users,
//             tasks: groupTasks,
//             graphData,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ status: false, message: error.message });
//     }
// };
export const dashboardStatistics = async (req, res) => {
    try {
      if (!req.user?._id) return res.status(401).json({ status: false, message: "Unauthorized" });
  
      const { _id, isAdmin } = req.user;
  
      const allTasks = isAdmin
        ? await Task.find({ isTrashed: false }).populate("team", "name role title email").sort({ _id: -1 })
        : await Task.find({ isTrashed: false, team: { $all: [_id] } }).populate("team", "name role title email").sort({ _id: -1 });
  
      const users = isAdmin
        ? await User.find({ isActive: true }).select("name title role isAdmin createdAt").limit(10).sort({ _id: -1 })
        : [];
  
      const groupTasks = allTasks.reduce((result, task) => {
        result[task.stage] = (result[task.stage] || 0) + 1;
        return result;
      }, {});
  
      const graphData = Object.entries(
        allTasks.reduce((result, task) => {
          result[task.priority] = (result[task.priority] || 0) + 1;
          return result;
        }, {})
      ).map(([name, total]) => ({ name, total }));
  
      res.status(200).json({
        status: true,
        message: "Successfully",
        totalTasks: allTasks.length,
        last10Task: allTasks.slice(0, 10),
        users,
        tasks: groupTasks,
        graphData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error.message });
    }
  };
  
// Get all tasks with filters
export const getTasks = async (req, res) => {
    try {
        const { stage, isTrashed } = req.query;
        const query = { isTrashed: isTrashed ? true : false };
        if (stage) query.stage = stage;

        const tasks = await Task.find(query).populate("team", "name title email").sort({ _id: -1 });

        res.status(200).json({ status: true, tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get task by ID
export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id)
            .populate("team", "name title role email")
            .populate("activities.by", "name");

        res.status(200).json({ status: true, task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// Create a subtask
export const createSubTask = async (req, res) => {
    try {
        const { title, tag, date } = req.body;
        const { id } = req.params;

        const task = await Task.findById(id);
        task.subTasks.push({ title, date, tag });

        await task.save();
        res.status(200).json({ status: true, message: "SubTask added successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// Update task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, team, stage, priority, assets } = req.body;

        const task = await Task.findById(id);
        task.title = title;
        task.date = date;
        task.priority = priority.toLowerCase();
        task.assets = assets;
        task.stage = stage.toLowerCase();
        task.team = team;

        await task.save();
        res.status(200).json({ status: true, message: "Task updated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// Trash task
export const trashTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        task.isTrashed = true;
        await task.save();

        res.status(200).json({ status: true, message: "Task trashed successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

// Delete or restore task
export const deleteRestoreTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if (actionType === "delete") {
            await Task.findByIdAndDelete(id);
        } else if (actionType === "deleteAll") {
            await Task.deleteMany({ isTrashed: true });
        } else if (actionType === "restore") {
            const task = await Task.findById(id);
            task.isTrashed = false;
            await task.save();
        } else if (actionType === "restoreAll") {
            await Task.updateMany({ isTrashed: true }, { $set: { isTrashed: false } });
        }

        res.status(200).json({ status: true, message: "Operation performed successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
};
