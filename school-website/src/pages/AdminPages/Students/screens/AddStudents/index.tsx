import { useState } from "react";
import "./styles.css";
import { showToast } from "../../../../../utils/customFunctions/toast";
import { api } from "../../../../../utils/api/apiInstanse";
import { API_URL } from "../../../../../utils/api/apiUrls";
import { useAppDispatch, useAppSelector } from "../../../../../provider/hooks";
import FullScreenLoader from "../../../../../components/Loader";
import { getStudentsRequest } from "../../../../../provider/slices/studentSlice";

const initialState = {
  firstName: "",
  lastName: "",
  rollNumber: "",
  adhaar: "",
  sssm: "",
  className: "",
  feesAmount: "",
  pendingFees: "",
  fathersName: "",
  mothersName: "",
  mobileNumberFather: "",
  mobileNumberMother: "",
  bankAccountNumber: "",
  ifscCode: "",
  busFees: "",
  createAt: "",
  createdBy: "",
};

export default function AddStudent() {
  const classes = useAppSelector((state) => state.classes.classes);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const addFakeStudents = async () => {
    const classIds = [
      "6922e98d9ddacc9a0d5bb943",
      "6922e9a19ddacc9a0d5bb946",
      "6922e9aa9ddacc9a0d5bb948",
      "6922e9b69ddacc9a0d5bb94a",
      "6927babac2c6e815e3374b53",
      "6927babfc2c6e815e3374b56",
      "6927bac3c2c6e815e3374b59",
      "6927bac7c2c6e815e3374b5c",
      "6927bacac2c6e815e3374b5f",
      "6927bacec2c6e815e3374b62",
      "6927bad2c2c6e815e3374b65",
      "6927bad6c2c6e815e3374b68",
      "6927badac2c6e815e3374b6b",
      "6927baddc2c6e815e3374b6e",
      "6927bae1c2c6e815e3374b71",
    ];

    const students = [];

    for (let i = 3; i <= 3000; i++) {
      const student = {
        firstName: `Student${i}`,
        lastName: `Last${i}`,
        rollNumber: `ROLL${1000 + i}`, // Unique
        adhaar: `${100000000000 + i}`, // Unique 12-digit
        sssm: `SSSM${500000 + i}`, // Unique
        className: classIds[Math.floor(Math.random() * classIds.length)],
        feesAmount: (20000 + (i % 10) * 500).toString(),
        pendingFees: i % 5 === 0 ? "0" : (1000 + (i % 4) * 300).toString(),
        fathersName: `Father${i}`,
        mothersName: `Mother${i}`,
        mobileNumberFather: `987450${1000 + i}`,
        mobileNumberMother: `987460${1000 + i}`,
        bankAccountNumber: `90000000${i}`,
        ifscCode: `IFSC000${100 + (i % 50)}`,
        busFees: i % 2 === 0 ? "5000" : "0",
        createAt: new Date().toISOString(),
        createdBy: "ADMIN",
      };

      students.push(student);
    }
    setLoading(true);

    for (let i = 0; i < students.length; i++) {
      await handleAddFakeStudents(students[i]);
    }

    dispatch(getStudentsRequest());
    setLoading(false);
  };

  const resetStates = () => {
    setForm(initialState);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (name === "className") {
      let feesAmn: string;
      let busFees: string;

      for (let i = 0; i < classes?.length; i++) {
        if (classes[i]?._id === value) {
          feesAmn = classes[i]?.fees;
          busFees = classes[i]?.busFees;
        }
      }

      setForm((s) => ({ ...s, feesAmount: feesAmn }));
      setForm((s) => ({ ...s, busFees: busFees }));
    }
  };

  const handleAddFakeStudents = async (student: any) => {
    // e.preventDefault();
    const {
      firstName,
      lastName,
      rollNumber,
      adhaar,
      sssm,
      className,
      feesAmount,
      pendingFees,
      fathersName,
      mothersName,
      mobileNumberFather,
      mobileNumberMother,
      bankAccountNumber,
      ifscCode,
    } = student;
    if (
      !firstName ||
      !lastName ||
      !rollNumber ||
      !adhaar ||
      !sssm ||
      !className ||
      !feesAmount ||
      !pendingFees ||
      !fathersName ||
      !mothersName ||
      !mobileNumberFather ||
      !mobileNumberMother ||
      !bankAccountNumber ||
      !ifscCode
    ) {
      showToast({ text: "All fields are required." });
      return;
    }

    try {
      const requestBody = {
        firstName,
        lastName,
        rollNumber,
        adhaar,
        sssm,
        className,
        feesAmount,
        pendingFees,
        fathersName,
        mothersName,
        mobileNumberFather,
        mobileNumberMother,
        bankAccountNumber,
        ifscCode,
        createdAt: Date.now(),
        createdBy: user?.fullName,
      };

      const response = await api.post(API_URL.students, requestBody);
      if (response.data.status === "success") {
        showToast({ text: response?.data?.message });
      }
    } catch (error) {
      console.log("Add student error --> ", error);
    } finally {
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      rollNumber,
      adhaar,
      sssm,
      className,
      feesAmount,
      pendingFees,
      fathersName,
      mothersName,
      mobileNumberFather,
      mobileNumberMother,
      bankAccountNumber,
      ifscCode,
    } = form;
    if (
      !firstName ||
      !lastName ||
      !rollNumber ||
      !adhaar ||
      !sssm ||
      !className ||
      !feesAmount ||
      !pendingFees ||
      !fathersName ||
      !mothersName ||
      !mobileNumberFather ||
      !mobileNumberMother ||
      !bankAccountNumber ||
      !ifscCode
    ) {
      showToast({ text: "All fields are required." });
      return;
    }

    try {
      const requestBody = {
        firstName,
        lastName,
        rollNumber,
        adhaar,
        sssm,
        className,
        feesAmount,
        pendingFees,
        fathersName,
        mothersName,
        mobileNumberFather,
        mobileNumberMother,
        bankAccountNumber,
        ifscCode,
        createdAt: Date.now(),
        createdBy: user?.fullName,
      };
      setLoading(true);

      const response = await api.post(API_URL.students, requestBody);
      if (response.data.status === "success") {
        showToast({ text: response?.data?.message });
        resetStates();
        dispatch(getStudentsRequest());
      }
    } catch (error) {
      console.log("Add student error --> ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-page">
      <form className="sf-card" onSubmit={handleSubmit} noValidate>
        <h2 className="sf-title">Add New Student</h2>

        <div className="sf-grid">
          <div className="sf-field">
            <label>First Name *</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="sf-field">
            <label>Last Name *</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="sf-field">
            <label>Roll Number *</label>
            <input
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
            />
          </div>

          <div className="sf-field">
            <label>Aadhaar</label>
            <input
              name="adhaar"
              value={form.adhaar}
              onChange={handleChange}
              maxLength={12}
              inputMode="numeric"
            />
          </div>

          <div className="sf-field">
            <label>SSSM</label>
            <input name="sssm" value={form.sssm} onChange={handleChange} />
          </div>

          <div className="sf-field">
            <label>Class</label>
            <select
              name="className"
              value={form.className}
              onChange={handleChange}
            >
              <option value="">Select class</option>
              {classes?.map((item, index) => {
                return (
                  <option key={index} value={item?._id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="sf-field">
            <label>Fees Amount</label>
            <input
              name="feesAmount"
              value={form.feesAmount}
              onChange={handleChange}
              inputMode="numeric"
            />
          </div>

          <div className="sf-field">
            <label>Pending Fees</label>
            <input
              name="pendingFees"
              value={form.pendingFees}
              onChange={handleChange}
              inputMode="numeric"
            />
          </div>

          <div className="sf-field">
            <label>Father's Name</label>
            <input
              name="fathersName"
              value={form.fathersName}
              onChange={handleChange}
            />
          </div>

          <div className="sf-field">
            <label>Mother's Name</label>
            <input
              name="mothersName"
              value={form.mothersName}
              onChange={handleChange}
            />
          </div>

          <div className="sf-field">
            <label>Father's Mobile</label>
            <input
              name="mobileNumberFather"
              value={form.mobileNumberFather}
              onChange={handleChange}
              maxLength={10}
              inputMode="tel"
            />
          </div>

          <div className="sf-field">
            <label>Mother's Mobile</label>
            <input
              name="mobileNumberMother"
              value={form.mobileNumberMother}
              onChange={handleChange}
              maxLength={10}
              inputMode="tel"
            />
          </div>

          <div className="sf-field">
            <label>Bank Account Number</label>
            <input
              name="bankAccountNumber"
              value={form.bankAccountNumber}
              onChange={handleChange}
            />
          </div>

          <div className="sf-field">
            <label>IFSC Code</label>
            <input
              name="ifscCode"
              value={form.ifscCode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sf-actions">
          <button
            type="button"
            className="sf-btn ghost"
            onClick={() => resetStates()}
          >
            Reset
          </button>
          <button type="submit" className="sf-btn primary">
            Save Student
          </button>
        </div>
      </form>
      {/* <button className="sf-btn primary" onClick={addFakeStudents}>
        Save Student
      </button> */}
      <FullScreenLoader show={loading} />
    </div>
  );
}
