import React, { useState } from "react";
import { Bell, PlusCircle, Trash2, Send } from "lucide-react";

const dummyNotifications = [
  {
    id: 1,
    title: "New Franchise Opening",
    message: "Check out the new franchise opening in your area!",
    scheduledAt: "2025-08-20T10:00",
    enabled: true,
  },
  {
    id: 2,
    title: "Special Offer",
    message: "Limited-time discount on franchise fees, hurry up!",
    scheduledAt: "2025-08-25T15:30",
    enabled: false,
  },
];

const PushNotifications = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [newNotif, setNewNotif] = useState({
    title: "",
    message: "",
    scheduledAt: "",
  });
  const [error, setError] = useState("");

  // Handle input change for new notification
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNotif((prev) => ({ ...prev, [name]: value }));
  };

  // Add new notification
  const handleAddNotification = () => {
    const { title, message, scheduledAt } = newNotif;
    if (!title.trim() || !message.trim() || !scheduledAt.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    const newEntry = {
      id: Date.now(),
      ...newNotif,
      enabled: true,
    };
    setNotifications((prev) => [newEntry, ...prev]);
    setNewNotif({ title: "", message: "", scheduledAt: "" });
  };

  // Toggle notification enabled/disabled
  const toggleEnabled = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Simulate sending test notification
  const sendTestNotification = (title) => {
    alert(`Test notification sent: "${title}"`);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 text-[#8b2f2f]">
        <Bell size={36} />
        <h1 className="text-2xl font-bold">Push Notifications</h1>
      </div>

      {/* Add New Notification */}
      <div className="border rounded-lg p-6 mb-8 shadow">
        <h2 className="text-lg font-semibold mb-4 text-[#8b2f2f]">Create New Notification</h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold">{error}</div>
        )}
        <div className="flex flex-col md:flex-row md:space-x-4 gap-4">
          <input
            type="text"
            name="title"
            value={newNotif.title}
            onChange={handleChange}
            placeholder="Notification Title"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
          />
          <input
            type="text"
            name="message"
            value={newNotif.message}
            onChange={handleChange}
            placeholder="Message"
            className="flex-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
          />
          <input
            type="datetime-local"
            name="scheduledAt"
            value={newNotif.scheduledAt}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
          />
          <button
            onClick={handleAddNotification}
            className="flex items-center gap-2 bg-[#8b2f2f] text-white px-4 py-2 rounded-lg hover:bg-[#732525] transition"
          >
            <PlusCircle size={20} />
            Add
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 && (
          <p className="text-gray-500 text-center">No notifications created.</p>
        )}
        {notifications.map(({ id, title, message, scheduledAt, enabled }) => (
          <div
            key={id}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow"
          >
            <div>
              <h3 className="text-xl font-semibold text-[#8b2f2f]">{title}</h3>
              <p className="text-gray-700">{message}</p>
              <p className="text-sm text-gray-500 mt-1">
                Scheduled at: {new Date(scheduledAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* Toggle */}
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => toggleEnabled(id)}
                  className="hidden"
                />
                <span
                  className={`w-12 h-6 inline-block rounded-full transition-colors ${
                    enabled ? "bg-[#8b2f2f]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                      enabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </span>
                <span className="ml-2 text-sm font-medium">
                  {enabled ? "Enabled" : "Disabled"}
                </span>
              </label>

              {/* Send Test */}
              <button
                onClick={() => sendTestNotification(title)}
                className="flex items-center gap-1 text-[#8b2f2f] hover:text-[#732525] transition"
                title="Send Test Notification"
              >
                <Send size={18} />
                <span className="hidden sm:inline text-sm">Test</span>
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteNotification(id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Delete Notification"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PushNotifications;
