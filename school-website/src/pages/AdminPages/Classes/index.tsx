import React, { useState } from "react";
import { useAppSelector } from "../../../provider/hooks";
import "./styles.css";
import ClassList from "./compoennets/classList";
import ClassActions from "./compoennets/classActions";
import ClassForm from "./compoennets/classForm";

const ClassesScreen = () => {
  const classes = useAppSelector((state) => state.classes.classes);
  const [showForm, setShowForm] = useState(false);

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <ClassActions selectedClass={openId} onAdd={() => setShowForm(true)} />
      <ClassList classes={classes} openId={openId} setOpenId={setOpenId} />
      {showForm && (
        <ClassForm
          initialData={openId} // null for add, object for edit
          onClose={() => setShowForm(false)}
          onSubmit={() => {}}
        />
      )}
    </>
  );
};

export default ClassesScreen;
