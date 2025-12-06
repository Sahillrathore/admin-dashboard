// src/pages/FaqCustomization.jsx
import React, { useMemo, useState } from "react";
import { IoReload } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import BreadCrumb from "../components/BreadCrumb";

const AUDIENCE_TABS = ["Consumer", "Doctor"];
const CATEGORY_TABS = ["Consultation", "Shop", "Wallet", "Forum", "Additional"];
const MAX_HOMEPAGE_FAQS = 3;

// --- Initial demo data (some marked as homepage: true) ---
const INITIAL_FAQ_DATA = {
  Consumer: {
    Consultation: [
      {
        id: "c1",
        question: "What types of consultations are available?",
        answer:
          "We offer video, audio, and chat-based consultations with certified doctors.",
        homepage: true,
      },
      {
        id: "c2",
        question: "Can I get refund for the wallet money?",
        answer:
          "Refunds for wallet money depend on the payment method and our refund policy.",
        homepage: true,
      },
      {
        id: "c3",
        question: "What is the Amrutam Forum?",
        answer:
          "Amrutam Forum is a community space where users can ask questions and share experiences.",
        homepage: true,
      },
      {
        id: "c4",
        question: "Can I pause the audio consultation?",
        answer:
          "You can temporarily mute the call, but pausing the session depends on doctor availability.",
        homepage: true,
      },
      {
        id: "c5",
        question: "Is there a minimum duration for an audio consultation?",
        answer:
          "Yes, the minimum duration is usually 15 minutes, depending on the doctor.",
        homepage: true,
      },
      {
        id: "c6",
        question: "Is there a minimum duration for an audio consultation?",
        answer:
          "Yes, the minimum duration is usually 15 minutes, depending on the doctor.",
        homepage: true,
      },
      {
        id: "c7",
        question: "What is the Amrutam Forum?",
        answer:
          "Amrutam Forum is a community space where users can ask questions and share experiences.",
        homepage: true,
      },
    ],
    Shop: [],
    Wallet: [],
    Forum: [],
    Additional: [],
  },
  Doctor: {
    Consultation: [
      {
        id: "d1",
        question: "How do I manage my consultation slots?",
        answer:
          "You can manage your consultation slots from the doctor dashboard settings.",
        homepage: true,
      },
      {
        id: "d2",
        question: "How is my consultation fee settled?",
        answer:
          "Consultation fees are settled to your registered bank account on a periodic basis.",
        homepage: false,
      },
    ],
    Shop: [],
    Wallet: [],
    Forum: [],
    Additional: [],
  },
};

const FaqCustomization = () => {
  const [activeAudience, setActiveAudience] = useState("Consumer");
  const [activeCategory, setActiveCategory] = useState("Consultation");
  const [faqData, setFaqData] = useState(INITIAL_FAQ_DATA);

  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [draggedId, setDraggedId] = useState(null);

  // view: 'list' (FAQ list) or 'add' (Add New FAQ form)
  const [view, setView] = useState("list");

  // Add FAQ form state
  const [platform, setPlatform] = useState("Consumer Web");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [addToHomepage, setAddToHomepage] = useState(false);

  // Homepage-limit modals
  const [modalStage, setModalStage] = useState("none"); // 'none' | 'confirmReplace' | 'selectReplace'
  const [pendingFaq, setPendingFaq] = useState(null);
  const [selectedReplaceId, setSelectedReplaceId] = useState(null);

  const currentList = faqData[activeAudience][activeCategory] || [];

  // helper: all homepage FAQs for current audience (across categories)
  const homepageFaqs = useMemo(() => {
    const audienceData = faqData[activeAudience];
    const all = [];
    Object.keys(audienceData).forEach((cat) => {
      audienceData[cat].forEach((f) => {
        if (f.homepage) all.push({ ...f, category: cat });
      });
    });
    return all;
  }, [faqData, activeAudience]);

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return currentList;
    return currentList.filter((faq) =>
      faq.question.toLowerCase().includes(q)
    );
  }, [search, currentList]);

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDrop = (targetId) => {
    if (!draggedId || draggedId === targetId) return;

    setFaqData((prev) => {
      const updated = { ...prev };
      const list = [...updated[activeAudience][activeCategory]];

      const fromIndex = list.findIndex((f) => f.id === draggedId);
      const toIndex = list.findIndex((f) => f.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;

      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);

      updated[activeAudience] = {
        ...updated[activeAudience],
        [activeCategory]: list,
      };

      return updated;
    });

    setDraggedId(null);
  };

  const handleResetSearch = () => setSearch("");

  const handleDownload = () => {
    const rows = filteredFaqs.map((f) => [f.question, f.answer || ""]);
    const header = ["Question", "Answer"];
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faq-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setPlatform("Consumer Web");
    setTitle("");
    setQuestion("");
    setAnswer("");
    setAddToHomepage(false);
  };

  // --- Add / Submit FAQ ---
  const handleSubmitFaq = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    const newFaq = {
      id: `n-${Date.now()}`,
      question: question.trim(),
      answer: answer.trim(),
      title: title.trim(),
      platform,
      homepage: addToHomepage,
    };

    if (addToHomepage && homepageFaqs.length >= MAX_HOMEPAGE_FAQS) {
      setPendingFaq(newFaq);
      setModalStage("confirmReplace");
      return;
    }

    // add directly
    setFaqData((prev) => {
      const updated = { ...prev };
      const list = updated[activeAudience][activeCategory] || [];
      updated[activeAudience] = {
        ...updated[activeAudience],
        [activeCategory]: [...list, newFaq],
      };
      return updated;
    });

    resetForm();
    setView("list");
  };

  // --- When Confirm -> Replace ---
  const handleConfirmReplace = () => {
    setModalStage("selectReplace");
    setSelectedReplaceId(null);
  };

  const handleDoReplace = () => {
    if (!pendingFaq || !selectedReplaceId) return;

    setFaqData((prev) => {
      const updated = { ...prev };
      const audienceData = { ...updated[activeAudience] };

      // Go through all categories for this audience and
      // replace the selected FAQ's content with the new one
      Object.keys(audienceData).forEach((cat) => {
        audienceData[cat] = audienceData[cat].map((f) => {
          if (f.id === selectedReplaceId) {
            return {
              ...f,
              question: pendingFaq.question,
              answer: pendingFaq.answer,
              title: pendingFaq.title,
              platform: pendingFaq.platform,
              homepage: true, // stays a homepage FAQ
            };
          }
          return f;
        });
      });

      updated[activeAudience] = audienceData;
      return updated;
    });

    setPendingFaq(null);
    setSelectedReplaceId(null);
    setModalStage("none");
    resetForm();
    setView("list");
  };


  const closeModals = () => {
    setModalStage("none");
    setPendingFaq(null);
    setSelectedReplaceId(null);
  };

  // ------------------------------------------------------------------

  return (
    <div className="px-7 py-0 space-y-6 w-full min-h-full">
      {/* Breadcrumb */}
      <BreadCrumb
        items={[
          { label: "FAQ", path: "/affiliate/dashboard" },
          { label: "App", path: "/customization/faq" },
          { label: "Customization" },
        ]}
      />

      {/* Top tabs */}
      <div className="bg-white rounded-2xl border border-zinc-100 px-4 py-4 flex gap-8 text-sm font-medium text-zinc-500">
        {["Banners", "Per Page Products", "Ingredients", "FAQ"].map(
          (tab) => {
            const isActive = tab === "FAQ";
            return (
              <button
                key={tab}
                className={`relative py-1 px-1 transition ${isActive
                    ? "text-[#28643B]"
                    : "text-zinc-500 hover:text-zinc-700"
                  }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#28643B] rounded-full" />
                )}
              </button>
            );
          }
        )}
      </div>

      {/* Consumer / Doctor tabs */}
      {
        view === "list" &&
        <div className="bg-white rounded-2xl border border-zinc-100 flex">
          {AUDIENCE_TABS.map((tab) => {
            const isActive = tab === activeAudience;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveAudience(tab);
                  setActiveCategory("Consultation");
                  setSearch("");
                  setExpandedId(null);
                }}
                className="flex-1 flex justify-center text-base py-3 font-medium transition"
              >
                <p
                  className={`py-2 w-fit px-1 transition-colors ${isActive
                      ? "text-[#28643B] border-b-2 border-[#28643B]"
                      : "text-zinc-500 hover:text-zinc-700"
                    }`}
                >
                  {tab}
                </p>
              </button>
            );
          })}
        </div>}

      {/* ---- VIEW: ADD NEW FAQ ---- */}
      {view === "add" ? (
        <div className="bg-white rounded-2xl border border-zinc-100 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-800">
              Add New FAQ
            </h2>
            <button
              onClick={() => {
                setView("list");
                resetForm();
              }}
              className="text-sm text-zinc-700 hover:text-zinc-700 underline"
            >
              Back to list
            </button>
          </div>

          <form onSubmit={handleSubmitFaq} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Select Platform */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-zinc-500 mb-1">
                  Select Platform <span className="text-red-500">*</span>
                </label>
                <input
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  placeholder="Consumer Web"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Select Title */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-zinc-500 mb-1">
                  Select Title <span className="text-red-500">*</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Add to homepage as well */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAddToHomepage((prev) => !prev)}
                className="flex items-center gap-2 text-sm text-zinc-700"
              >
                <span className="h-4 w-4 rounded-full border border-[#28643B] flex items-center justify-center">
                  {addToHomepage && (
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28643B]" />
                  )}
                </span>
                <span>Add to homepage as well</span>
              </button>
            </div>

            {/* Question / Answer */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-zinc-500 mb-1">
                  Add Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  placeholder="Type your question here"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-zinc-500 mb-1">
                  Add Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={4}
                  placeholder="Type the answer here"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 resize-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 rounded-xl cursor-pointer border border-zinc-200 bg-zinc-50 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Clear all
              </button>
              <button
                type="submit"
                className="px-8 py-2 rounded-xl cursor-pointer bg-[#28643B] text-white text-sm font-medium shadow-sm hover:bg-emerald-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ---- VIEW: FAQ LIST ---- */
        <div className="bg-white rounded-2xl border border-zinc-100 p-5 space-y-4">
          {/* Header row with search + actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="font-semibold text-zinc-800">FAQ List</span>

              {/* Search */}
              <div className="flex-1 md:w-72 ml-5">
                <div className="bg-zinc-100 rounded-lg px-3 flex items-center gap-2 py-2">
                  <img src="/search-icon.png" alt="" className="h-4 w-4" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search here"
                    className="border-none outline-none bg-transparent text-sm text-[#3A643B] flex-1"
                  />
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={handleResetSearch}
                className="h-8 w-8 rounded-lg bg-zinc-100 text-[#28643B] flex items-center justify-center shadow-sm"
                title="Reset"
              >
                <IoReload size={16} />
              </button>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView("add")}
                className="px-5 py-2 rounded-xl bg-[#28643B] text-white text-sm font-medium shadow-sm hover:bg-emerald-700 transition"
              >
                Add New FAQ
              </button>
              {/* sort stub */}
              <button
                className="h-8 w-8 rounded-lg bg-zinc-100 text-xs flex items-center justify-center shadow-sm text-[#28643B]"
                title="Sort"
              >
                ⇅
              </button>
              {/* download */}
              <button
                onClick={handleDownload}
                className="h-8 w-8 rounded-lg bg-zinc-100 text-xs flex items-center justify-center shadow-sm text-[#28643B]"
                title="Download"
              >
                <FaDownload size={13} />
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="border-b pb-4 border-zinc-200 mt-2">
            <div className="flex justify-around text-sm font-medium">
              {CATEGORY_TABS.map((cat) => {
                const isActive = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSearch("");
                      setExpandedId(null);
                    }}
                    className={`relative py-2 pb-0.5 transition ${isActive
                        ? "text-[#28643B]"
                        : "text-zinc-500 hover:text-zinc-700"
                      }`}
                  >
                    {cat}
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-[3px] h-0.5 bg-[#28643B] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ list */}
          <div className="rounded-xl border-zinc-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-[40px_40px_1fr_40px] items-center text-xs text-zinc-500 px-0 py-3">
              <span />
              <span />
              <span>Question</span>
              <span className="text-right" />
            </div>

            <div className="divide-y divide-zinc-200">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  draggable
                  onDragStart={() => handleDragStart(faq.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(faq.id)}
                  className={`grid grid-cols-[40px_40px_1fr_40px] items-center px-4 py-3 hover:bg-zinc-50 cursor-default`}
                >
                  {/* drag handle */}
                  <button
                    className="flex items-center justify-center cursor-grab active:cursor-grabbing text-zinc-400"
                    title="Drag to reorder"
                  >
                    <span className="leading-none text-lg">⋮⋮</span>
                  </button>

                  {/* checkbox */}
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-300 text-[#28643B] focus:ring-[#28643B]"
                    />
                  </div>

                  {/* question + answer */}
                  <button
                    onClick={() =>
                      setExpandedId((prev) =>
                        prev === faq.id ? null : faq.id
                      )
                    }
                    className="text-left text-sm text-zinc-800 pr-3"
                  >
                    {faq.question}
                    {expandedId === faq.id && faq.answer && (
                      <p className="mt-2 text-xs text-zinc-500">
                        {faq.answer}
                      </p>
                    )}
                  </button>

                  {/* chevron */}
                  <button
                    onClick={() =>
                      setExpandedId((prev) =>
                        prev === faq.id ? null : faq.id
                      )
                    }
                    className="flex items-center justify-end text-zinc-400"
                  >
                    <span
                      className={`transition-transform ${expandedId === faq.id ? "rotate-180" : ""
                        }`}
                    >
                      ▾
                    </span>
                  </button>
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <div className="px-4 py-8 text-center text-xs text-zinc-400">
                  No FAQs found for this filter.
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-3">
            <span>Rows per page: 8</span>
            <div className="flex items-center gap-2">
              <button className="h-7 w-7 rounded-lg border border-zinc-300 flex items-center justify-center">
                {"<"}
              </button>
              <span>1–8 of 80</span>
              <button className="h-7 w-7 rounded-lg border border-zinc-300 flex items-center justify-center">
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------- MODAL 1: MAX HOMEPAGE CONFIRM -------- */}
      {modalStage === "confirmReplace" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl px-8 py-6 max-w-92 w-full text-center space-y-4">
            <p className="text-xs text-red-500 font-medium">
              Homepage already has maximum number of FAQs.
            </p>
            <p className="text-sm font-semibold text-zinc-700">
              Would you like to replace it instead?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={closeModals}
                className="px-6 py-2 rounded-xl cursor-pointer border border-emerald-700 bg-zinc-50 text-sm text-emerald-800 hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReplace}
                className="px-6 py-2 rounded-xl cursor-pointer bg-[#28643B] text-white text-sm font-medium hover:bg-emerald-700"
              >
                Replace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------- MODAL 2: SELECT FAQ TO REPLACE -------- */}
      {modalStage === "selectReplace" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full max-h-[80vh] flex flex-col">
            <div className="px-8 pt-6 pb-3 border-b border-zinc-100">
              <p className="text-sm font-medium text-zinc-800">
                Select the question that you would like to replace it with
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-4 space-y-2">
              {homepageFaqs.map((faq) => (
                <label
                  key={faq.id}
                  className="flex items-start gap-3 py-2 border-b border-zinc-100 last:border-b-0 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="replace-faq"
                    checked={selectedReplaceId === faq.id}
                    onChange={() => setSelectedReplaceId(faq.id)}
                    className="mt-1 h-4 w-4 text-[#28643B] border-zinc-300"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-800">
                      {faq.question}
                    </p>
                  </div>
                </label>
              ))}

              {homepageFaqs.length === 0 && (
                <p className="text-xs text-zinc-400">
                  No homepage FAQs found.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 px-8 py-4 border-t border-zinc-100">
              <button
                onClick={closeModals}
                className="px-6 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDoReplace}
                disabled={!selectedReplaceId}
                className="px-6 py-2 rounded-xl bg-[#28643B] text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Replace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqCustomization;
