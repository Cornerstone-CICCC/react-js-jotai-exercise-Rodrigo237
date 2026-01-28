import { useAtom } from "jotai";
import {
  firstNameAtom,
  lastNameAtom,
  ageAtom,
  hobbiesAtom,
} from "../atoms/user.atom";
import { useState } from "react";

const hobbiesList = ["Sports", "Music", "Gaming", "Reading", "Travel"];

export default function User() {
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [age, setAge] = useAtom(ageAtom);
  const [hobbies, setHobbies] = useAtom(hobbiesAtom);

  const [formFirst, setFormFirst] = useState("");
  const [formLast, setFormLast] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formHobbies, setFormHobbies] = useState<string[]>([]);

  const toggleHobby = (hobby: string) => {
    setFormHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((h) => h !== hobby)
        : [...prev, hobby]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFirstName(formFirst);
    setLastName(formLast);
    setAge(Number(formAge));
    setHobbies(formHobbies);

    setFormFirst("");
    setFormLast("");
    setFormAge("");
    setFormHobbies([]);
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">User Info</h1>

      <div className="space-y-2 border p-4 rounded bg-gray-50">
        <div><strong>First Name:</strong> {firstName}</div>
        <div><strong>Last Name:</strong> {lastName}</div>
        <div><strong>Age:</strong> {age}</div>
        <div><strong>Hobbies:</strong> {hobbies.join(", ")}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        <h2 className="text-xl font-semibold">Update User</h2>

        <input
          type="text"
          placeholder="First name"
          className="border p-2 w-full rounded"
          value={formFirst}
          onChange={(e) => setFormFirst(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last name"
          className="border p-2 w-full rounded"
          value={formLast}
          onChange={(e) => setFormLast(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          className="border p-2 w-full rounded"
          value={formAge}
          onChange={(e) => setFormAge(e.target.value)}
          required
        />

        <div className="space-y-2">
          <p className="font-medium">Hobbies:</p>

          {hobbiesList.map((hobby) => (
            <label key={hobby} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formHobbies.includes(hobby)}
                onChange={() => toggleHobby(hobby)}
              />
              {hobby}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
