import { useEffect, useState } from "react";
import { showToast } from "../../../../../../utils/customFunctions/toast";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../provider/hooks";
import { getStudentsRequest } from "../../../../../../provider/slices/studentSlice";
import { api } from "../../../../../../utils/api/apiInstanse";
import { API_URL } from "../../../../../../utils/api/apiUrls";
import "./updateFromStyles.css";
import type { UpdateFormTypes } from "../types";
import type { StudentType } from "../../../types";

const initialState: StudentType = {
  firstName: "",
  lastName: "",
  rollNumber: "",
  adhaar: "",
  sssm: "",
  class: "",
  feesAmount: 0,
  pendingFees: 0,
  fathersName: "",
  mothersName: "",
  mobileNumberFather: 0,
  mobileNumberMother: 0,
  bankAccountNumber: 0,
  ifscCode: "",
  createdBy: "",
  stream: "",
  achievements: "",
  _id: "",
  attendance: "",
  reportCards: [],
  createdAt: "",
};

const UpdateForm = ({
  onClose = () => {},
  studentData,
  setLoading,
  clearSelectedStudent,
}: UpdateFormTypes) => {
  const classes = useAppSelector((state) => state.classes.classes);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<any>(studentData());

  const resetStates = () => {
    setForm(initialState);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((s: any) => ({ ...s, [name]: value }));
    if (name === "className") {
      let feesAmn: string;
      let busFees: string;

      for (let i = 0; i < classes?.length; i++) {
        if (classes[i]?._id === value) {
          feesAmn = classes[i]?.fees;
          busFees = classes[i]?.busFees;
        }
      }

      setForm((s: any) => ({ ...s, feesAmount: feesAmn }));
      setForm((s: any) => ({ ...s, busFees: busFees }));
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
        class: className,
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

      const response = await api.patch(API_URL.students, requestBody);
      if (response.data.status === "success") {
        dispatch(getStudentsRequest());
        resetStates();
        showToast({ text: response?.data?.message });
      }
      clearSelectedStudent();
      onClose();
    } catch (error) {
      console.log("Add student error --> ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const data = studentData();
    if (data) {
      setForm({
        ...data,
        className: data.class,
      });
    }
  }, [studentData]);

  return (
    <div className="sf-modal-overlay" onClick={onClose}>
      <div className="sf-modal-body" onClick={(e) => e.stopPropagation()}>
        <div className="sf-header">
          <h2 className="sf-title">Add New Student</h2>
          <button type="button" className="sf-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <form className="sf-card" onSubmit={handleSubmit} noValidate>
          <h2 className="sf-title">Update New Student</h2>

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
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
