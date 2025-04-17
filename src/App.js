import React, { useState, useEffect } from "react";

export default function App() {
  const [form, setForm] = useState({
    fullName: "",
    birthDate: "",
    birthPlace: "",
    parentName: "",
    personalPhone: "",
    parentPhone: "",
    scoutMember: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [showList, setShowList] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("participants");
    if (saved) setParticipants(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("participants", JSON.stringify(participants));
  }, [participants]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(1000 + Math.random() * 9000);
    setTicketId(id);
    setSubmitted(true);
    setParticipants([...participants, { ...form, id }]);
  };

  const handlePrint = () => {
    window.print();
    setSubmitted(false);
    setForm({
      fullName: "",
      birthDate: "",
      birthPlace: "",
      parentName: "",
      personalPhone: "",
      parentPhone: "",
      scoutMember: false
    });
    setTicketId(null);
  };

  const handlePasswordCheck = () => {
    if (password === "0602") {
      setShowList(true);
    } else {
      alert("رمز خاطئ");
    }
  };

  const InputField = ({ label, name, type = "text" }) => (
    <div style={{ marginBottom: 10 }}>
      <label>{label}</label><br />
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: "5px", borderRadius: 5, border: "1px solid #ccc" }}
      />
    </div>
  );

  const Ticket = ({ form }) => {
    const price = form.scoutMember ? 45 : 55;

    return (
      <div className="ticket" style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px dashed #333",
        padding: 20,
        marginTop: 20,
        borderRadius: 10
      }}>
        <h2>تذكرة تسجيل</h2>
        <p>رقم التذكرة: {ticketId}</p>
        <p>الاسم و اللقب: {form.fullName}</p>
        <p>تاريخ الولادة: {form.birthDate}</p>
        <p>مكان الولادة: {form.birthPlace}</p>
        <p>اسم و لقب الولي: {form.parentName}</p>
        <p>رقم الهاتف الشخصي: {form.personalPhone}</p>
        <p>رقم هاتف الولي: {form.parentPhone}</p>
        <p>منخرط بالحركة الكشفية: {form.scoutMember ? "نعم" : "لا"}</p>
        <p>المعلوم: {price} د</p>
        <button onClick={handlePrint} style={{ marginTop: 10 }}>طباعة التذكرة و تسجيل جديد</button>
      </div>
    );
  };

  return (
    <div style={{
      direction: "rtl",
      minHeight: "100vh",
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: 20
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0,0,0,0.3)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src="/logo.png" alt="logo" style={{ maxWidth: 120 }} />
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <InputField label="الاسم و اللقب:" name="fullName" />
            <InputField label="تاريخ الولادة:" name="birthDate" type="date" />
            <InputField label="مكان الولادة:" name="birthPlace" />
            <InputField label="اسم و لقب الولي:" name="parentName" />
            <InputField label="رقم الهاتف الشخصي:" name="personalPhone" />
            <InputField label="رقم هاتف الولي:" name="parentPhone" />
            <div style={{ marginBottom: 10 }}>
              <label>
                <input
                  type="checkbox"
                  name="scoutMember"
                  checked={form.scoutMember}
                  onChange={handleChange}
                />{" "}
                منخرط بالحركة الكشفية
              </label>
            </div>
            <button type="submit">سجّل</button>
          </form>
        ) : (
          <Ticket form={form} />
        )}

        <div style={{ marginTop: 30 }}>
          {!showList ? (
            <>
              <p>عرض قائمة المشاركين (خاص بالمبرمج):</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل الرمز السري"
              />
              <button onClick={handlePasswordCheck}>دخول</button>
            </>
          ) : (
            <div>
              <h3>قائمة المشاركين</h3>
              <ul>
                {participants.map((p, i) => (
                  <li key={i}>{p.fullName} - {p.birthDate}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}