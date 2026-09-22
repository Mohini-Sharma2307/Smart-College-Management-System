// import { useEffect, useState } from "react";
// import "./Students.css";

// function Students() {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);

//   const [editingStudent, setEditingStudent] = useState(null);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const [editFormData, setEditFormData] = useState({
//     fullName: "",
//     email: "",
//   });

//   // ===============================
//   // FETCH STUDENTS
//   // ===============================

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch("http://localhost:5000/api/students", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStudents(data.students);
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.log("Fetch students error:", error);
//       setMessage("Unable to connect to server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===============================
//   // ADD FORM CHANGE
//   // ===============================

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ===============================
//   // CREATE STUDENT
//   // ===============================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch("http://localhost:5000/api/students", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Student created successfully");

//         setFormData({
//           fullName: "",
//           email: "",
//           password: "",
//         });

//         setShowAddForm(false);

//         fetchStudents();
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.log("Create student error:", error);
//       alert("Unable to connect to server");
//     }
//   };

//   // ===============================
//   // DELETE STUDENT
//   // ===============================

//   const handleDelete = async (studentId) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this student?",
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `http://localhost:5000/api/students/${studentId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const data = await response.json();

//       if (response.ok) {
//         alert("Student deleted successfully");

//         setStudents((currentStudents) =>
//           currentStudents.filter((student) => student._id !== studentId),
//         );

//         if (selectedStudent && selectedStudent._id === studentId) {
//           setSelectedStudent(null);
//         }
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.log("Delete student error:", error);
//       alert("Unable to connect to server");
//     }
//   };

//   // ===============================
//   // OPEN EDIT FORM
//   // ===============================

//   const handleEdit = (student) => {
//     setEditingStudent(student);

//     setEditFormData({
//       fullName: student.fullName,
//       email: student.email,
//     });

//     setShowEditForm(true);
//   };

//   // ===============================
//   // EDIT FORM CHANGE
//   // ===============================

//   const handleEditChange = (e) => {
//     setEditFormData({
//       ...editFormData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ===============================
//   // UPDATE STUDENT
//   // ===============================

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (!editingStudent) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch(
//         `http://localhost:5000/api/students/${editingStudent._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(editFormData),
//         },
//       );

//       const data = await response.json();

//       if (response.ok) {
//         alert("Student updated successfully");

//         setStudents((currentStudents) =>
//           currentStudents.map((student) =>
//             student._id === editingStudent._id
//               ? {
//                   ...student,
//                   fullName: data.student.fullName,
//                   email: data.student.email,
//                 }
//               : student,
//           ),
//         );

//         if (selectedStudent && selectedStudent._id === editingStudent._id) {
//           setSelectedStudent({
//             ...selectedStudent,
//             fullName: data.student.fullName,
//             email: data.student.email,
//           });
//         }

//         setShowEditForm(false);
//         setEditingStudent(null);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.log("Update student error:", error);
//       alert("Unable to connect to server");
//     }
//   };

//   // ===============================
//   // SEARCH STUDENTS
//   // ===============================

//   const filteredStudents = students.filter((student) => {
//     const searchText = search.toLowerCase().trim();

//     return (
//       student.fullName.toLowerCase().includes(searchText) ||
//       student.email.toLowerCase().includes(searchText)
//     );
//   });

//   // ===============================
//   // LOADING
//   // ===============================

//   if (loading) {
//     return (
//       <div className="students-page">
//         <p>Loading students...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="students-page">
//       {/* ================= HEADER ================= */}

//       <div className="students-header">
//         <div>
//           <h1>Students Management</h1>

//           <p>Manage all registered students</p>
//         </div>

//         <div className="students-header-right">
//           <div className="students-count">
//             <span>Total Students</span>

//             <h2>{students.length}</h2>
//           </div>

//           <button
//             className="add-student-btn"
//             onClick={() => setShowAddForm(true)}
//           >
//             + Add Student
//           </button>
//         </div>
//       </div>

//       {/* ================= STUDENTS CARD ================= */}

//       <div className="students-card">
//         <div className="students-card-header">
//           <h2>All Students</h2>

//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             className="student-search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {message && <p>{message}</p>}

//         <div className="students-table-wrapper">
//           <table className="students-table">
//             <thead>
//               <tr>
//                 <th>Student</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Joined</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredStudents.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     style={{
//                       textAlign: "center",
//                       padding: "25px",
//                     }}
//                   >
//                     {search
//                       ? "No students found for your search"
//                       : "No students available"}
//                   </td>
//                 </tr>
//               ) : (
//                 filteredStudents.map((student) => (
//                   <tr key={student._id}>
//                     <td>
//                       <span className="student-name">{student.fullName}</span>
//                     </td>

//                     <td>{student.email}</td>

//                     <td>
//                       <span className="student-role">{student.role}</span>
//                     </td>

//                     <td>
//                       {new Date(student.createdAt).toLocaleDateString("en-IN")}
//                     </td>

//                     <td>
//                       <button
//                         className="view-student-btn"
//                         onClick={() => setSelectedStudent(student)}
//                       >
//                         View
//                       </button>

//                       <button
//                         className="edit-student-btn"
//                         onClick={() => handleEdit(student)}
//                       >
//                         Edit
//                       </button>

//                       <button
//                         className="delete-student-btn"
//                         onClick={() => handleDelete(student._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ================= STUDENT DETAILS ================= */}

//         {selectedStudent && (
//           <div className="student-details">
//             <div className="student-details-header">
//               <h2>Student Details</h2>

//               <button onClick={() => setSelectedStudent(null)}>✕</button>
//             </div>

//             <div className="student-details-content">
//               <p>
//                 <strong>Student ID:</strong> {selectedStudent._id}
//               </p>

//               <p>
//                 <strong>Full Name:</strong> {selectedStudent.fullName}
//               </p>

//               <p>
//                 <strong>Email:</strong> {selectedStudent.email}
//               </p>

//               <p>
//                 <strong>Role:</strong> {selectedStudent.role}
//               </p>

//               <p>
//                 <strong>Registered On:</strong>{" "}
//                 {new Date(selectedStudent.createdAt).toLocaleDateString(
//                   "en-IN",
//                 )}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ================= ADD STUDENT MODAL ================= */}

//       {showAddForm && (
//         <div className="add-student-overlay">
//           <div className="add-student-modal">
//             <div className="add-student-header">
//               <div>
//                 <h2>Add New Student</h2>

//                 <p>Create a new student account</p>
//               </div>

//               <button
//                 className="close-modal-btn"
//                 onClick={() => setShowAddForm(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Full Name</label>

//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Enter full name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Email</label>

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Password</label>

//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowAddForm(false)}
//                 >
//                   Cancel
//                 </button>

//                 <button type="submit" className="save-student-btn">
//                   Create Student
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ================= EDIT STUDENT MODAL ================= */}

//       {showEditForm && (
//         <div className="add-student-overlay">
//           <div className="add-student-modal">
//             <div className="add-student-header">
//               <div>
//                 <h2>Edit Student</h2>

//                 <p>Update student information</p>
//               </div>

//               <button
//                 className="close-modal-btn"
//                 onClick={() => {
//                   setShowEditForm(false);
//                   setEditingStudent(null);
//                 }}
//               >
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={handleUpdate}>
//               <div className="form-group">
//                 <label>Full Name</label>

//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Enter full name"
//                   value={editFormData.fullName}
//                   onChange={handleEditChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Email</label>

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                   value={editFormData.email}
//                   onChange={handleEditChange}
//                   required
//                 />
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => {
//                     setShowEditForm(false);
//                     setEditingStudent(null);
//                   }}
//                 >
//                   Cancel
//                 </button>

//                 <button type="submit" className="save-student-btn">
//                   Update Student
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Students;



import { useEffect, useState } from "react";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
  });

  // ===============================
  // FETCH STUDENTS
  // ===============================

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/students",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStudents(data.students || []);
      } else {
        setMessage(data.message || "Unable to fetch students");
      }
    } catch (error) {
      console.log("Fetch students error:", error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // ADD FORM CHANGE
  // ===============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // CREATE STUDENT
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Student created successfully");

        setFormData({
          fullName: "",
          email: "",
          password: "",
        });

        setShowAddForm(false);

        fetchStudents();
      } else {
        alert(data.message || "Unable to create student");
      }
    } catch (error) {
      console.log("Create student error:", error);
      alert("Unable to connect to server");
    }
  };

  // ===============================
  // DELETE STUDENT
  // ===============================

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/students/${studentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Student deleted successfully");

        setStudents((currentStudents) =>
          currentStudents.filter(
            (student) => student._id !== studentId
          )
        );

        if (
          selectedStudent &&
          selectedStudent._id === studentId
        ) {
          setSelectedStudent(null);
        }
      } else {
        alert(data.message || "Unable to delete student");
      }
    } catch (error) {
      console.log("Delete student error:", error);
      alert("Unable to connect to server");
    }
  };

  // ===============================
  // OPEN EDIT FORM
  // ===============================

  const handleEdit = (student) => {
    setEditingStudent(student);

    setEditFormData({
      fullName: student.fullName,
      email: student.email,
    });

    setShowEditForm(true);
  };

  // ===============================
  // EDIT FORM CHANGE
  // ===============================

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // UPDATE STUDENT
  // ===============================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingStudent) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/students/${editingStudent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editFormData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Student updated successfully");

        setStudents((currentStudents) =>
          currentStudents.map((student) =>
            student._id === editingStudent._id
              ? {
                  ...student,
                  fullName: data.student.fullName,
                  email: data.student.email,
                }
              : student
          )
        );

        if (
          selectedStudent &&
          selectedStudent._id === editingStudent._id
        ) {
          setSelectedStudent({
            ...selectedStudent,
            fullName: data.student.fullName,
            email: data.student.email,
          });
        }

        setShowEditForm(false);
        setEditingStudent(null);
      } else {
        alert(data.message || "Unable to update student");
      }
    } catch (error) {
      console.log("Update student error:", error);
      alert("Unable to connect to server");
    }
  };

  // ===============================
  // SEARCH STUDENTS
  // ===============================

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase().trim();

    return (
      student.fullName
        ?.toLowerCase()
        .includes(searchText) ||
      student.email
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // ===============================
  // INITIALS
  // ===============================

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // ===============================
  // FORMAT DATE
  // ===============================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="students-page">
        <div className="students-loading">
          <div className="students-loader"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="students-page">

      {/* ===============================
          PAGE HEADER
      =============================== */}

      <div className="students-header">

        <div className="students-title-section">

          <div className="students-title-icon">
            👨‍🎓
          </div>

          <div>
            <h1>Students Management</h1>

            <p>
              Manage and monitor all registered students
            </p>
          </div>

        </div>

        <button
          className="add-student-btn"
          onClick={() => setShowAddForm(true)}
        >
          <span>+</span>
          Add Student
        </button>

      </div>


      {/* ===============================
          SUMMARY
      =============================== */}

      <div className="students-summary">

        <div className="student-summary-card">

          <div className="summary-card-icon">
            👨‍🎓
          </div>

          <div>
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>

        </div>

        <div className="student-summary-card">

          <div className="summary-card-icon">
            🔍
          </div>

          <div>
            <span>Showing</span>
            <strong>{filteredStudents.length}</strong>
          </div>

        </div>

        <div className="student-summary-card">

          <div className="summary-card-icon">
            🎓
          </div>

          <div>
            <span>Student Accounts</span>
            <strong>
              {students.filter(
                (student) => student.role === "student"
              ).length}
            </strong>
          </div>

        </div>

      </div>


      {/* ===============================
          MAIN STUDENTS CARD
      =============================== */}

      <div className="students-card">

        <div className="students-card-header">

          <div>
            <h2>All Students</h2>

            <p>
              View, edit or manage registered student accounts
            </p>
          </div>

          <div className="student-search-wrapper">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search students..."
              className="student-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-search-btn"
                onClick={() => setSearch("")}
                type="button"
              >
                ✕
              </button>
            )}

          </div>

        </div>


        {/* ===============================
            MESSAGE
        =============================== */}

        {message && (
          <div className="students-message">
            <span>⚠️</span>
            <p>{message}</p>
          </div>
        )}


        {/* ===============================
            TABLE
        =============================== */}

        <div className="students-table-wrapper">

          <table className="students-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="students-empty-cell"
                  >

                    <div className="students-empty">

                      <div className="empty-student-icon">
                        👨‍🎓
                      </div>

                      <h3>
                        {search
                          ? "No Students Found"
                          : "No Students Available"}
                      </h3>

                      <p>
                        {search
                          ? "Try searching with another name or email."
                          : "There are no registered students yet."}
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredStudents.map((student) => (

                  <tr key={student._id}>

                    {/* STUDENT */}

                    <td>

                      <div className="student-user-info">

                        <div className="student-avatar">
                          {getInitials(student.fullName)}
                        </div>

                        <div className="student-user-text">

                          <strong>
                            {student.fullName}
                          </strong>

                          <span>
                            Student Account
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td>

                      <span className="student-email">
                        {student.email}
                      </span>

                    </td>


                    {/* ROLE */}

                    <td>

                      <span className="student-role">
                        <span className="role-dot"></span>
                        {student.role || "student"}
                      </span>

                    </td>


                    {/* JOINED */}

                    <td>

                      <span className="student-joined">
                        {formatDate(student.createdAt)}
                      </span>

                    </td>


                    {/* ACTIONS */}

                    <td>

                      <div className="student-actions">

                        <button
                          className="student-action-btn view"
                          onClick={() =>
                            setSelectedStudent(student)
                          }
                          title="View student"
                        >
                          👁
                        </button>

                        <button
                          className="student-action-btn edit"
                          onClick={() =>
                            handleEdit(student)
                          }
                          title="Edit student"
                        >
                          ✏️
                        </button>

                        <button
                          className="student-action-btn delete"
                          onClick={() =>
                            handleDelete(student._id)
                          }
                          title="Delete student"
                        >
                          🗑️
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* ===============================
            STUDENT DETAILS
        =============================== */}

        {selectedStudent && (

          <div className="student-details">

            <div className="student-details-header">

              <div className="details-title">

                <div className="details-avatar">
                  {getInitials(
                    selectedStudent.fullName
                  )}
                </div>

                <div>
                  <h2>Student Details</h2>

                  <p>
                    Student account information
                  </p>
                </div>

              </div>

              <button
                className="details-close-btn"
                onClick={() =>
                  setSelectedStudent(null)
                }
              >
                ✕
              </button>

            </div>


            <div className="student-details-content">

              <div className="student-detail-item">

                <span>Student ID</span>

                <strong>
                  {selectedStudent._id}
                </strong>

              </div>

              <div className="student-detail-item">

                <span>Full Name</span>

                <strong>
                  {selectedStudent.fullName}
                </strong>

              </div>

              <div className="student-detail-item">

                <span>Email</span>

                <strong>
                  {selectedStudent.email}
                </strong>

              </div>

              <div className="student-detail-item">

                <span>Role</span>

                <strong className="details-role">
                  {selectedStudent.role || "student"}
                </strong>

              </div>

              <div className="student-detail-item">

                <span>Registered On</span>

                <strong>
                  {formatDate(
                    selectedStudent.createdAt
                  )}
                </strong>

              </div>

            </div>

          </div>

        )}

      </div>


      {/* ===============================
          ADD STUDENT MODAL
      =============================== */}

      {showAddForm && (

        <div
          className="add-student-overlay"
          onClick={() => setShowAddForm(false)}
        >

          <div
            className="add-student-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="add-student-header">

              <div className="modal-title-section">

                <div className="modal-title-icon">
                  👨‍🎓
                </div>

                <div>
                  <h2>Add New Student</h2>

                  <p>
                    Create a new student account
                  </p>
                </div>

              </div>

              <button
                className="close-modal-btn"
                onClick={() =>
                  setShowAddForm(false)
                }
                type="button"
              >
                ✕
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create login password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowAddForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-student-btn"
                >
                  Create Student
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ===============================
          EDIT STUDENT MODAL
      =============================== */}

      {showEditForm && (

        <div
          className="add-student-overlay"
          onClick={() => {
            setShowEditForm(false);
            setEditingStudent(null);
          }}
        >

          <div
            className="add-student-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="add-student-header">

              <div className="modal-title-section">

                <div className="modal-title-icon">
                  ✏️
                </div>

                <div>
                  <h2>Edit Student</h2>

                  <p>
                    Update student information
                  </p>
                </div>

              </div>

              <button
                className="close-modal-btn"
                onClick={() => {
                  setShowEditForm(false);
                  setEditingStudent(null);
                }}
                type="button"
              >
                ✕
              </button>

            </div>


            <form onSubmit={handleUpdate}>

              <div className="form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={editFormData.fullName}
                  onChange={handleEditChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  required
                />

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingStudent(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-student-btn"
                >
                  Update Student
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Students;
