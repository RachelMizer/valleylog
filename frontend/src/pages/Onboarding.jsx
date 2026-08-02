import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeOnboarding } from "../api";
import { useAuth } from "../context/AuthContext";

const FEATURES = [
  ["Villagers", "Track friendship levels, daily gifts, and discussion status for every villager you're building a relationship with."],
  ["Tasks", "Keep a running list of daily and weekly to-dos, quests, and anything else you don't want to forget."],
  ["Recipes", "Browse the full cooking recipe library and mark off what you've cooked."],
  ["Crops, Creatures & Fish", "Reference tables for what to grow, catch, and where to find it."],
  ["Gems, Vendor Ware & Crafting", "Look up sell prices, materials, and vendor stock at a glance."],
];

export default function Onboarding() {
  const { refreshUser, markOnboarded } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function handleGetStarted() {
    setSubmitting(true);
    try {
      await completeOnboarding();
      await refreshUser();
      markOnboarded();
      navigate("/");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <h1>Welcome to Valley Log</h1>
      <p>Here's what you can do:</p>
      <dl className="account-details">
        {FEATURES.map(([title, desc]) => (
          <Fragment key={title}>
            <dt>{title}</dt>
            <dd>{desc}</dd>
          </Fragment>
        ))}
      </dl>
      <p>
        <button type="button" onClick={handleGetStarted} disabled={submitting}>
          {submitting ? "One sec…" : "Get Started"}
        </button>
      </p>
    </div>
  );
}
