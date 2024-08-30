function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default {
  data() {
    return {
      searchQuery: '',
      selectedFilter: 'all',
      expandedImage: null,
      currentIndex: 0,
      filters: ['all', 'celulares', 'roupas', 'sapatos', 'carros', 'paisagens', 'comidas'],
      cards: [],
      showScrollToTop: false,
      imageUrl: '',
      imageTitle: '',
      imageText: '',
      imageCategory: '',
      newCategory: '',
      isSidebarOpen: false,
      showImageForm: false,
      showCategoryForm: false, 
    };
  },
  computed: {
    filteredCards() {
      const query = this.searchQuery.toLowerCase();
      return this.cards.filter(card => {
        const matchesTitle = card.title.toLowerCase().includes(query);
        const matchesText = card.text.toLowerCase().includes(query);
        return matchesTitle || matchesText;
      });
    }
  },
  methods: {
    filterLabel(filter) {
      if (filter === 'all') return 'Mostrar tudo';
      return filter.charAt(0).toUpperCase() + filter.slice(1);
    },
    expandImage(image) {
      this.expandedImage = image;
      this.currentIndex = this.cards.findIndex((card) => card.image === image);
    },
    closeImage() {
      this.expandedImage = null;
    },
    previousImage() {
      this.currentIndex = (this.currentIndex - 1 + this.filteredCards.length) % this.filteredCards.length;
      this.expandedImage = this.filteredCards[this.currentIndex].image;
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.filteredCards.length;
      this.expandedImage = this.filteredCards[this.currentIndex].image;
    },
    handleScroll() {
      this.showScrollToTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    addImage() {
      const newCard = {
        id: Date.now(),
        category: this.imageCategory,
        title: this.imageTitle,
        text: this.imageText,
        image: this.imageUrl,
      };
      this.cards.push(newCard);
      this.saveImages();
      this.resetForm();
      this.showImageForm = false; 
    },
    addCategory() {
      if (this.newCategory && !this.filters.includes(this.newCategory.toLowerCase())) {
        this.filters.push(this.newCategory.toLowerCase());
        this.newCategory = '';
        this.saveCategories(); 
        this.showCategoryForm = false; 
      }
    },
    saveImages() {
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },
    saveCategories() {
      localStorage.setItem('filters', JSON.stringify(this.filters));
    },
    loadImages() {
      const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
      const staticCards = shuffleArray([
        { id: 1, category: 'celulares', title: 'Celular', text: 'Lorem lorem lorem', image: 'images/phone-1.jpg' },
        { id: 2, title: 'Roupa', text: 'Roupa estilosa', image: 'images/cloth-1.jpg' },
        { id: 3, title: 'Roupa', text: 'Look', image: 'images/cloth-2.jpg' },
        { id: 4, title: 'Roupa', text: 'Roupinha', image: 'images/cloth-3.jpg' },
        { id: 5, title: 'Celular', text: 'iPhone', image: 'images/phone-2.jpg' },
        { id: 6, title: 'Sapatos', text: 'Prato delicioso', image: 'images/shoe-2.jpg' },
        { id: 7, title: 'Sapatos', text: 'Prato delicioso', image: 'images/shoe-1.jpg' },
     
      ]);
      this.cards = [...staticCards, ...savedCards];
    },
    loadCategories() {
      const savedFilters = JSON.parse(localStorage.getItem('filters'));
      if (savedFilters && savedFilters.length > 0) {
        this.filters = savedFilters;
      }
    },
    deleteImage(card) {
      this.cards = this.cards.filter((c) => c.id !== card.id);
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },
    resetForm() {
      this.imageUrl = '';
      this.imageTitle = '';
      this.imageText = '';
      this.imageCategory = '';
    },
  
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.showImageForm = false; 
      this.showCategoryForm = false; 
    },
    toggleImageForm() {
      this.showImageForm = !this.showImageForm;
    },
    toggleCategoryForm() {
      this.showCategoryForm = !this.showCategoryForm;
    },
  },
  mounted() {
    this.loadImages();
    this.loadCategories();
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
