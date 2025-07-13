import jsPDF from 'jspdf';

export function downloadAsTxt(summary: string, carePlan: string, sessionDate?: string) {
  const content = formatExportContent(summary, carePlan, sessionDate);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `session-summary-${formatDateForFilename(sessionDate)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAsPdf(summary: string, carePlan: string, sessionDate?: string) {
  const pdf = new jsPDF();
  const content = formatExportContent(summary, carePlan, sessionDate);
  
  // Set font and split content into lines
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  
  const lines = pdf.splitTextToSize(content, 180);
  let yPosition = 20;
  
  lines.forEach((line: string) => {
    if (yPosition > 280) {
      pdf.addPage();
      yPosition = 20;
    }
    pdf.text(line, 15, yPosition);
    yPosition += 7;
  });
  
  pdf.save(`session-summary-${formatDateForFilename(sessionDate)}.pdf`);
}

export function copyAllToClipboard(summary: string, carePlan: string, sessionDate?: string) {
  const content = formatExportContent(summary, carePlan, sessionDate);
  return navigator.clipboard.writeText(content);
}

function formatExportContent(summary: string, carePlan: string, sessionDate?: string): string {
  const date = sessionDate ? `Session Date: ${sessionDate}\n\n` : '';
  return `${date}SESSION SUMMARY:\n${summary}\n\nCARE PLAN & NEXT STEPS:\n${carePlan}\n\nTherapist Comments:\n_________________________\n_________________________\n_________________________`;
}

function formatDateForFilename(sessionDate?: string): string {
  if (sessionDate) {
    return sessionDate.replace(/[\/\\:*?"<>|]/g, '-');
  }
  return new Date().toISOString().split('T')[0];
}