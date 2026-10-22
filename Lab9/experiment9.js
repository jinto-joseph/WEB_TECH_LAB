
/*
 * Experiment 9: Working with MongoDB Using Shell Commands
 * Database: collegeDB
 * Collection: students
 */

// 1. Select database and create collection
use("collegeDB");

db.createCollection("students");

// 2. Insert student records
db.students.insertMany([
  { rollno: 201, name: "Arun", department: "CSE", year: 3, marks: 85, city: "Chennai" },
  { rollno: 202, name: "Priya", department: "ECE", year: 3, marks: 92, city: "Coimbatore" },
  { rollno: 203, name: "Karthik", department: "CSE", year: 2, marks: 78, city: "Salem" },
  { rollno: 204, name: "Meena", department: "EEE", year: 3, marks: 88, city: "Madurai" },
  { rollno: 205, name: "Rahul", department: "CSE", year: 4, marks: 67, city: "Trichy" },
  { rollno: 206, name: "Divya", department: "ECE", year: 2, marks: 81, city: "Chennai" },
  { rollno: 207, name: "Vijay", department: "IT", year: 3, marks: 75, city: "Erode" },
  { rollno: 208, name: "Anitha", department: "CSE", year: 3, marks: 95, city: "Coimbatore" },
  { rollno: 209, name: "Santhosh", department: "EEE", year: 4, marks: 72, city: "Salem" },
  { rollno: 210, name: "Kavya", department: "ECE", year: 3, marks: 89, city: "Madurai" }
]);

// 3. Display all students
db.students.find();

// 4. Find CSE students
db.students.find({ department: "CSE" });

// 5. Find students scoring above 80
db.students.find({ marks: { $gt: 80 } });

// 6. Display names and marks only
db.students.find({}, { name: 1, marks: 1, _id: 0 });

// 7. Find CSE students in year 3
db.students.find({ department: "CSE", year: 3 });

// 8. Find CSE or ECE students
db.students.find({
  $or: [
    { department: "CSE" },
    { department: "ECE" }
  ]
});

// 9. Sort by marks ascending and descending
db.students.find().sort({ marks: 1 });
db.students.find().sort({ marks: -1 });

// 10. Find the top 3 students
db.students.find().sort({ marks: -1 }).limit(3);

// 11. Count CSE students
db.students.countDocuments({ department: "CSE" });

// 12. Update one student's marks
db.students.updateOne(
  { rollno: 201 },
  { $set: { marks: 90 } }
);

// 13. Add status to all CSE students
db.students.updateMany(
  { department: "CSE" },
  { $set: { status: "Active" } }
);

// 14. Delete one student
db.students.deleteOne({ rollno: 210 });

// 15. Display distinct departments
db.students.distinct("department");

// 16. Calculate department-wise average marks
db.students.aggregate([
  {
    $group: {
      _id: "$department",
      averageMarks: { $avg: "$marks" }
    }
  }
]);
