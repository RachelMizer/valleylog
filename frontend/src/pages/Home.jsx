import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CraftingTab from "../components/CraftingTab";
import CreaturesTab from "../components/CreaturesTab";
import CropsTab from "../components/CropsTab";
import FishTab from "../components/FishTab";
import GemsTab from "../components/GemsTab";
import RecipesTab from "../components/RecipesTab";
import TasksTab from "../components/TasksTab";
import VendorTab from "../components/VendorTab";
import VillagersTab from "../components/VillagersTab";
import QUOTES from "../data/quotes.json";

// `title` and `blurb` drive the per-page header, so every tab explains its own
// purpose from one place rather than each component growing its own heading.
// Deliberately no item counts in the copy — they'd drift as datasets grow.
const TABS = [
  {
    id: "villagers", label: "Villagers", title: "Villager Tracker",
    blurb: "Track friendship levels, tick off today's three favorite gifts as you hand " +
      "them over, and record each villager's assigned hangout bonus. “New Day” clears " +
      "the daily fields while keeping friendship levels and role assignments.",
  },
  {
    id: "tasks", label: "Tasks", title: "Task Manager",
    blurb: "Keep a running list of what you're working toward, grouped into Daily, Weekly, " +
      "Quest, and Other. Check things off as you finish them, or edit and delete them as " +
      "your goals shift.",
  },
  {
    id: "recipes", label: "Cooking", title: "Cooking Recipes",
    blurb: "Every dish in the game with its ingredients, star rating, energy restored, and " +
      "sell price. Filter by meal type or star level, and mark recipes as cooked to " +
      "see what you still have left to unlock.",
  },
  {
    id: "crafting", label: "Crafting", title: "Crafting Recipes",
    blurb: "Everything you can craft and the materials each item needs — refined materials, " +
      "enchantments, fences and paving, functional items, and furniture. Search by item or " +
      "by a material you're trying to use up.",
  },
  {
    id: "crops", label: "Crops", title: "Crops & Seeds",
    blurb: "Grow times, watering counts, harvest yields, seed and sell prices, and profit " +
      "per minute — for working out what's actually worth planting.",
  },
  {
    id: "creatures", label: "Creatures", title: "Critters & Creatures",
    blurb: "Where each critter shows up and what to feed it to befriend it, including the " +
      "expansion realms. Colour variants of the same critter share a favorite food, " +
      "except sunbirds, which each prefer their own flowers.",
  },
  {
    id: "fish", label: "Fish", title: "Fish & Seafood",
    blurb: "Where each fish bites, which ripple colour marks its spot, and what it sells " +
      "for — plus the event-only catches and how they're unlocked.",
  },
  {
    id: "gems", label: "Gems & Minerals", title: "Gems & Minerals",
    blurb: "Colours, shapes, sell prices, and which biomes each gem and mineral turns up " +
      "in. Search by a colour to find everything that matches it.",
  },
  {
    id: "vendor", label: "Stall Wares", title: "Stall Wares",
    blurb: "What the vendor stalls sell and what it costs, by zone and realm. Seeds are " +
      "always in stock; rotating ingredients change day to day, so treat those as a price " +
      "reference rather than a guarantee they're available right now.",
  },
];

export default function Home() {
  const { justOnboarded, clearJustOnboarded } = useAuth();
  const showWelcome = useRef(justOnboarded).current;
  const [activeTab, setActiveTab] = useState("villagers");
  const quote = useRef(QUOTES[Math.floor(Math.random() * QUOTES.length)]).current;

  useEffect(() => {
    if (justOnboarded) clearJustOnboarded();
  }, [justOnboarded, clearJustOnboarded]);

  return (
    <div className="page">
      {showWelcome && <p>Thanks for signing up — glad to have you here.</p>}

      <blockquote className="quote-banner">
        “{quote.quote}”
        <cite>— {quote.source}</cite>
      </blockquote>

      <nav className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="tab-content">
        {(() => {
          const tab = TABS.find(t => t.id === activeTab);
          return (
            <header className="panel-header">
              <h2>{tab.title}</h2>
              <p>{tab.blurb}</p>
            </header>
          );
        })()}

        {activeTab === "villagers" ? (
          <VillagersTab />
        ) : activeTab === "tasks" ? (
          <TasksTab />
        ) : activeTab === "recipes" ? (
          <RecipesTab />
        ) : activeTab === "crops" ? (
          <CropsTab />
        ) : activeTab === "creatures" ? (
          <CreaturesTab />
        ) : activeTab === "fish" ? (
          <FishTab />
        ) : activeTab === "gems" ? (
          <GemsTab />
        ) : activeTab === "crafting" ? (
          <CraftingTab />
        ) : activeTab === "vendor" ? (
          <VendorTab />
        ) : (
          <p className="empty-state">
            {TABS.find(t => t.id === activeTab)?.label} is coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
