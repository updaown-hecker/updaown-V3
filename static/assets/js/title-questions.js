// title-questions.js

(() => {
    // --- Question Bank ---
    const questions = {
        math: [
            "How to solve quadratic equations using the quadratic formula?",
            "What is the Pythagorean theorem and how is it used?",
            "How do you calculate the circumference of a circle?",
            "How to find the mean, median, and mode of a dataset?",
            "What is the difference between permutations and combinations?",
            "How to calculate compound interest?",
            "What is an irrational number?",
            "How do you convert fractions into decimals?",
            "How to solve simultaneous equations?",
            "What is the binomial theorem?",
            "What are prime numbers and how do you find them?",
            "How to calculate probability of an event?",
            "What is the difference between arithmetic and geometric sequences?",
            "How do you simplify square roots?",
            "What is the distance formula in coordinate geometry?"
        ],
        algebra: [
            "How do you factorize a quadratic expression?",
            "What are linear equations and how do you graph them?",
            "How to simplify algebraic expressions?",
            "What is the slope-intercept form of a line?",
            "How to solve systems of equations with substitution?",
            "How do you solve inequalities?",
            "What is an exponential function?",
            "How to expand binomials?",
            "What are polynomials and how do you divide them?",
            "How do you solve absolute value equations?",
            "What is the quadratic function’s vertex form?",
            "How to solve simultaneous equations graphically?",
            "How do you simplify rational expressions?",
            "What is a function vs a relation?",
            "How do you calculate domain and range?"
        ],
        science: [
            "What is Newton's Second Law of Motion?",
            "How does photosynthesis work in plants?",
            "What is the structure of an atom?",
            "How do volcanoes form?",
            "What causes the phases of the Moon?",
            "What is the process of cellular respiration?",
            "How does DNA store genetic information?",
            "What is evolution by natural selection?",
            "How do tides occur?",
            "What is the greenhouse effect?",
            "How does the human circulatory system work?",
            "What are renewable and nonrenewable resources?",
            "How do earthquakes happen?",
            "What is the difference between mass and weight?",
            "What is an ecosystem and how does it function?"
        ],
        chemistry: [
            "What is the periodic table and why is it important?",
            "How to balance chemical equations?",
            "What are acids and bases?",
            "How does ionic bonding work?",
            "What is the law of conservation of mass?",
            "What is the difference between elements and compounds?",
            "How does covalent bonding work?",
            "What is Avogadro's number?",
            "How do catalysts speed up reactions?",
            "What is the difference between exothermic and endothermic reactions?",
            "What is pH and how is it measured?",
            "How to identify oxidation and reduction?",
            "What are the states of matter?",
            "What is molar mass and how to calculate it?",
            "How do you separate mixtures in chemistry?"
        ],
        physics: [
            "What is the difference between speed and velocity?",
            "How does gravity affect falling objects?",
            "What is kinetic energy vs potential energy?",
            "How do simple machines make work easier?",
            "What is the law of inertia?",
            "How does friction affect motion?",
            "What is Ohm’s Law?",
            "How do waves transfer energy?",
            "What is the Doppler effect?",
            "How does sound travel through different mediums?",
            "What are Newton’s three laws of motion?",
            "How does electricity flow in a circuit?",
            "What is electromagnetic radiation?",
            "How does momentum work in collisions?",
            "What is the concept of work and power in physics?"
        ],
        history: [
            "Who was the first President of the United States?",
            "What caused the fall of the Roman Empire?",
            "When did World War II start?",
            "What was the Industrial Revolution?",
            "Why was the Declaration of Independence important?",
            "What were the main causes of the American Civil War?",
            "What was the Cold War?",
            "Who discovered America?",
            "What was the Renaissance?",
            "What led to the French Revolution?",
            "What is the Magna Carta?",
            "When did the Berlin Wall fall?",
            "Who was Cleopatra?",
            "What was the Great Depression?",
            "How did the printing press change the world?"
        ],
        geography: [
            "What are the seven continents of the world?",
            "How do tectonic plates cause earthquakes?",
            "What is the largest desert on Earth?",
            "How do rivers form?",
            "What is the difference between latitude and longitude?",
            "What are the Earth's layers?",
            "Which is the longest river in the world?",
            "What is the tallest mountain on Earth?",
            "What are the major climate zones?",
            "What is the Ring of Fire?",
            "How do glaciers shape landforms?",
            "What are natural resources?",
            "What is the water cycle?",
            "How do hurricanes form?",
            "What is a delta in geography?"
        ]
    };

    // Flatten all questions into one array
    const allQuestions = Object.values(questions).flat();

    // Pick a random question
    const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];

    // Set the page title
    document.title = randomQuestion;

    // Ensure favicon is applied
    const link = document.querySelector("link[rel='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = "assets/media/favicon/google.ico";
    document.head.appendChild(link);
})();
