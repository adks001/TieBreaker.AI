import html2canvas from 'html2canvas';

/**
 * Generate formatted text for social sharing
 */
export function buildShareText(analysis) {
  if (!analysis) return "";
  const { question, winner, winnerScore, scoredOptions } = analysis;
  
  const optionsText = scoredOptions.map(o => `• ${o.name}: ${o.score}%`).join("\n");

  return `⚖️ *TieBreaker AI Verdict* ⚖️

*Dilemma:* "${question}"

🏆 *WINNER:* ${winner} (${winnerScore}% Conviction Score)

*Option Scores:*
${optionsText}

💡 *Verdict:* ${analysis.verdictRationale ? analysis.verdictRationale.substring(0, 160) + '...' : ''}

Resolved with TieBreaker AI (Universal Decision Intelligence)`;
}

export function shareToWhatsApp(analysis) {
  const text = buildShareText(analysis);
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

export function shareToTwitter(analysis) {
  const text = `⚖️ Solved my dilemma with TieBreaker AI!\n\nQuestion: "${analysis.question.substring(0, 80)}..."\n🏆 Winner: ${analysis.winner} (${analysis.winnerScore}%)\n\n#TieBreakerAI #DecisionMade`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

export function shareToLinkedIn(analysis) {
  const text = buildShareText(analysis);
  const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

export function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
}

export async function exportCardAsImage(elementId = "verdict-card", fileName = "TieBreaker_Verdict.png") {
  const element = document.getElementById(elementId) || document.getElementById("verdict-card");
  if (!element) return;
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#0f172a',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Failed to export image card:", err);
  }
}

/**
 * Export full multi-tab analysis to CSV format for Google Sheets / Excel
 */
export function exportToCsv(analysis) {
  if (!analysis) return;
  const { question, winner, winnerScore, scoredOptions, verdictRationale, comparisonTable, specsMatrix, cbaData, prosCons, swotAnalysis, sixHats } = analysis;
  const options = (scoredOptions || []).map(o => o.name);

  let csvContent = "";

  const escapeCsv = (str) => {
    if (str === undefined || str === null) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  // Section 1: Dilemma Summary
  csvContent += "SECTION 1: TIEBREAKER AI VERDICT SUMMARY\n";
  csvContent += `Dilemma Question,${escapeCsv(question)}\n`;
  csvContent += `Recommended Winner,${escapeCsv(winner)}\n`;
  csvContent += `Conviction Score,${winnerScore}%\n`;
  csvContent += `Verdict Rationale,${escapeCsv(verdictRationale)}\n\n`;

  // Section 2: Option Scores Ranking
  csvContent += "SECTION 2: RANKED OPTION SCORES\n";
  csvContent += "Rank,Option Name,Match Conviction Score %,Verdict Tag\n";
  (scoredOptions || []).forEach((opt, idx) => {
    csvContent += `${idx + 1},${escapeCsv(opt.name)},${opt.score}%,${escapeCsv(opt.verdictTag || '')}\n`;
  });
  csvContent += "\n";

  // Section 3: Pros & Cons Matrix
  csvContent += "SECTION 3: PROS & CONS MATRIX\n";
  csvContent += "Option Name,Type,Point Description\n";
  options.forEach(opt => {
    const pc = prosCons?.[opt];
    if (pc) {
      (pc.pros || []).forEach(p => csvContent += `${escapeCsv(opt)},PRO,${escapeCsv(p)}\n`);
      (pc.cons || []).forEach(c => csvContent += `${escapeCsv(opt)},CON,${escapeCsv(c)}\n`);
    }
  });
  csvContent += "\n";

  // Section 4: SWOT Analysis
  csvContent += "SECTION 4: SWOT ANALYSIS\n";
  csvContent += "Option Name,Quadrant,Details\n";
  options.forEach(opt => {
    const sw = swotAnalysis?.[opt];
    if (sw) {
      (sw.strengths || []).forEach(s => csvContent += `${escapeCsv(opt)},Strength,${escapeCsv(s)}\n`);
      (sw.weaknesses || []).forEach(w => csvContent += `${escapeCsv(opt)},Weakness,${escapeCsv(w)}\n`);
      (sw.opportunities || []).forEach(o => csvContent += `${escapeCsv(opt)},Opportunity,${escapeCsv(o)}\n`);
      (sw.threats || []).forEach(t => csvContent += `${escapeCsv(opt)},Threat,${escapeCsv(t)}\n`);
    }
  });
  csvContent += "\n";

  // Section 5: Tabular Matrix Comparison
  csvContent += "SECTION 5: TABULAR MATRIX COMPARISON\n";
  csvContent += `Decision Criteria,${options.map(o => escapeCsv(o)).join(",")}\n`;
  (comparisonTable || []).forEach(row => {
    const lineVals = options.map(opt => {
      const cell = row[opt];
      return cell ? escapeCsv(`${cell.score || cell.rating} - ${cell.note || ''}`) : '""';
    });
    csvContent += `${escapeCsv(row.feature)},${lineVals.join(",")}\n`;
  });
  csvContent += "\n";

  // Section 6: Technical Specifications Matrix
  csvContent += "SECTION 6: TECHNICAL SPECIFICATIONS MATRIX\n";
  csvContent += `Technical Metric,${options.map(o => escapeCsv(o)).join(",")}\n`;
  (specsMatrix || []).forEach(row => {
    const lineVals = options.map(opt => escapeCsv(row.values?.[opt] || "N/A"));
    csvContent += `${escapeCsv(row.specName)},${lineVals.join(",")}\n`;
  });
  csvContent += "\n";

  // Section 7: Cost-Benefit TCO Analysis
  csvContent += "SECTION 7: COST-BENEFIT & 5-YEAR TCO ANALYSIS\n";
  csvContent += `Financial Metric,${options.map(o => escapeCsv(o)).join(",")}\n`;
  (cbaData || []).forEach(row => {
    const lineVals = options.map(opt => escapeCsv(row.values?.[opt] || "N/A"));
    csvContent += `${escapeCsv(row.metricName)},${lineVals.join(",")}\n`;
  });
  csvContent += "\n";

  // Section 8: 6 Thinking Hats
  csvContent += "SECTION 8: 6 THINKING HATS METHODOLOGY\n";
  csvContent += "Thinking Hat,Perspective Synthesis\n";
  if (sixHats) {
    csvContent += `White Hat (Objective Data),${escapeCsv(sixHats.whiteHat)}\n`;
    csvContent += `Red Hat (Intuition & Emotion),${escapeCsv(sixHats.redHat)}\n`;
    csvContent += `Black Hat (Critical Risks),${escapeCsv(sixHats.blackHat)}\n`;
    csvContent += `Yellow Hat (Optimistic Growth),${escapeCsv(sixHats.yellowHat)}\n`;
    csvContent += `Green Hat (Creative Alternatives),${escapeCsv(sixHats.greenHat)}\n`;
    csvContent += `Blue Hat (Decision Synthesis),${escapeCsv(sixHats.blueHat)}\n`;
  }

  // Trigger Download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  const cleanWinner = (winner || "Analysis").replace(/[^a-zA-Z0-9]/g, "_");
  link.setAttribute("download", `TieBreaker_Analysis_${cleanWinner}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
