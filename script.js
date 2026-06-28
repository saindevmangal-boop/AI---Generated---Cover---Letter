const form = document.getElementById('coverLetterForm');
const resultContainer = document.getElementById('resultContainer');
const copyButton = document.getElementById('copyButton');

const state = {
  name: '',
  role: '',
  company: '',
  skills: '',
  generatedLetter: '',
  isGenerating: false,
};

function renderResult() {
  if (state.isGenerating) {
    resultContainer.textContent = 'Generating your cover letter...';
    return;
  }

  if (!state.generatedLetter) {
    resultContainer.innerHTML = '<p class="empty-state">Your cover letter will appear here after you generate it.</p>';
    return;
  }

  resultContainer.textContent = state.generatedLetter;
}

function updateState(field, value) {
  state[field] = value;
}

function buildCoverLetter({ name, role, company, skills }) {
  return `Dear Hiring Manager at ${company},

My name is ${name}, and I am excited to apply for the ${role} role at ${company}. With a strong foundation in ${skills}, I consistently deliver measurable outcomes across product strategy, stakeholder alignment, and customer-focused execution.

I am especially drawn to ${company} because of its reputation for innovation and dedication to building impactful experiences. My expertise in ${skills} allows me to contribute immediately while collaborating effectively with cross-functional teams.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and skills can support ${company}’s next phase of growth.

Sincerely,
${name}`;
}

form.addEventListener('input', (event) => {
  const target = event.target;
  if (!target.name) return;
  updateState(target.name, target.value.trimStart());
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  state.isGenerating = true;
  renderResult();

  window.setTimeout(() => {
    state.generatedLetter = buildCoverLetter(state);
    state.isGenerating = false;
    renderResult();
  }, 400);
});

copyButton.addEventListener('click', async () => {
  if (!state.generatedLetter) return;

  try {
    await navigator.clipboard.writeText(state.generatedLetter);
    copyButton.textContent = 'Copied!';
    window.setTimeout(() => {
      copyButton.textContent = 'Copy to Clipboard';
    }, 1600);
  } catch (error) {
    copyButton.textContent = 'Copy Failed';
    console.error(error);
    window.setTimeout(() => {
      copyButton.textContent = 'Copy to Clipboard';
    }, 1600);
  }
});

renderResult();
