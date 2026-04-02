/**
 * Project Detail Modal
 * Opens a detailed view when clicking on a project card.
 */

const PROJECTS = {
    'reseau-ilot': {
        tag: 'Réseau & Infra',
        title: 'Infrastructure Réseau Îlot',
        date: 'Janvier 2026 — BTS CIEL IR, 1ère année',
        subtitle: 'Projet réalisé dans le cadre du BTS CIEL IR — mise en place d\'un environnement réseau complet simulant une petite entreprise.',
        description: 'Ce projet consistait à concevoir et déployer une infrastructure réseau de A à Z en environnement virtualisé. L\'objectif était de reproduire les conditions d\'un parc informatique réel, avec gestion centralisée des machines, ticketing, et administration système.',
        tasks: [
            'Installation et configuration de machines virtuelles sous Debian et Windows Server via VirtualBox',
            'Déploiement de GLPI pour la gestion de parc informatique et le système de ticketing',
            'Configuration d\'un serveur DHCP et DNS pour l\'attribution automatique des adresses IP',
            'Mise en place de partages réseau et gestion des droits d\'accès utilisateurs',
            'Rédaction d\'une documentation technique complète du réseau déployé',
        ],
        learnings: 'Ce projet m\'a permis de comprendre concrètement la topologie réseau d\'une entreprise, la logique d\'administration serveur, et l\'importance d\'une bonne documentation. J\'ai aussi développé ma capacité à diagnostiquer des problèmes de connectivité en environnement virtualisé.',
        tech: ['VirtualBox', 'Debian Linux', 'Windows Server', 'GLPI', 'DHCP', 'DNS', 'Active Directory'],
    },
    'gamesync': {
        tag: 'Développement iOS',
        title: 'Application GameSync',
        date: 'Novembre 2025 — Apple Foundation Program',
        subtitle: 'Application native iOS développée en Swift dans le cadre de la certification Apple Foundation Program.',
        description: 'GameSync est une application mobile permettant à plusieurs joueurs de choisir ensemble un jeu vidéo à jouer, en tenant compte des préférences de chacun. Le cœur de l\'app est un algorithme de matchmaking qui analyse les goûts communs et propose une sélection optimale.',
        tasks: [
            'Conception de l\'architecture de l\'application en Swift avec UIKit',
            'Développement d\'un algorithme de matchmaking basé sur les préférences utilisateurs (scoring pondéré)',
            'Création d\'une interface de roulette animée pour le tirage au sort final',
            'Gestion de la persistance des données utilisateurs avec UserDefaults',
            'Design de l\'interface utilisateur en respectant les Human Interface Guidelines d\'Apple',
        ],
        learnings: 'Ce projet m\'a appris à structurer une application iOS de manière propre (MVC), à penser l\'UX mobile, et à traduire une logique métier complexe (le matchmaking) en algorithme efficace. La certification Apple Foundation a renforcé mes bases en Swift et en développement natif.',
        tech: ['Swift', 'UIKit', 'Xcode', 'iOS', 'MVC', 'UserDefaults', 'Auto Layout'],
    },
    'piscine42': {
        tag: 'Fondamentaux',
        title: 'Piscine 42 — UNIX & C',
        date: 'Été 2024 — École 42',
        subtitle: 'Immersion intensive de 4 semaines à l\'école 42 — un bootcamp sans filet centré sur le bas niveau.',
        description: 'La Piscine 42 est un processus de sélection intensif où l\'on apprend à programmer en C et à maîtriser l\'environnement UNIX en quasi-autonomie. Chaque jour, de nouveaux exercices et projets à rendre, sans cours magistraux — uniquement la pratique, la documentation, et l\'entraide entre pairs.',
        tasks: [
            'Résolution quotidienne d\'exercices de programmation en C (pointeurs, tableaux, récursivité)',
            'Gestion manuelle de la mémoire : allocation dynamique avec malloc, libération avec free',
            'Écriture de scripts Shell et Bash pour automatiser des tâches UNIX',
            'Développement de mini-projets : recréation de fonctions de la libc (strlen, strcpy, memcpy…)',
            'Travail sur des projets en binôme avec Git pour le versioning',
        ],
        learnings: 'La Piscine m\'a donné une compréhension profonde de ce qui se passe "sous le capot" d\'un programme. Gérer manuellement la mémoire, comprendre les pointeurs, et travailler sans IDE graphique sont des compétences rares qui m\'ont rendu meilleur développeur de façon générale.',
        tech: ['C', 'Bash', 'Shell', 'Git', 'UNIX', 'Makefile', 'Vim'],
    },
};

// DOM references
const overlay = document.getElementById('project-modal');
const closeBtn = document.getElementById('modal-close-btn');
const modalTag = document.getElementById('modal-tag');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalDate = document.getElementById('modal-date');
const modalDescription = document.getElementById('modal-description');
const modalTasks = document.getElementById('modal-tasks');
const modalLearnings = document.getElementById('modal-learnings');
const modalTech = document.getElementById('modal-tech');

function openModal(projectId) {
    const data = PROJECTS[projectId];
    if (!data) return;

    // Populate content
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;

    // Date badge
    if (data.date) {
        modalDate.textContent = data.date;
        modalDate.style.display = 'inline-flex';
    } else {
        modalDate.style.display = 'none';
    }

    modalDescription.textContent = data.description;
    modalLearnings.textContent = data.learnings;

    modalTasks.innerHTML = data.tasks.map(t => `<li>${t}</li>`).join('');
    modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');

    // Show
    overlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    overlay.querySelector('.modal-container').scrollTop = 0;
    closeBtn.focus();
}

function closeModal() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
}

// Card click handlers
document.querySelectorAll('.project-card[data-project-id]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.projectId));
});

// Close button
closeBtn.addEventListener('click', closeModal);

// Click outside modal container
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

// Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
});
