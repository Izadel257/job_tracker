
// I obviously made a change
document.getElementById("submitJob").addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: scrapeAndSend
    });
  });
});

function scrapeAndSend() {
  const job = {
    company: document.querySelector('[data-company], .company, [class*=company]')?.innerText || "Unknown Company",
    title: document.title || "Unknown Title",
    link: window.location.href
  };

  fetch("https://script.google.com/macros/s/AKfycbwCAbxUtdB3XYu5VGWgBrl_aoBRQujQrh-GGI2pQfaPXmpkkTVaivAkAL9giTZLzlmRPA/exec", {
    method: "POST",
    body: JSON.stringify(job),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(text => console.log("Job submission status:", text))
  .catch(err => console.error("Submission failed", err));
}
