<template>
  <div id="app">
    <div class="header">
      <button class="sidebar-toggle-button" @click="toggleSidebar">☰</button>
      <h1 class="gallery-title">Galeria de Imagens</h1>
    </div>

    <div :class="['sidebar', { open: isSidebarOpen }]">
      <button class="add-image-button" @click="toggleImageForm">Adicionar Imagem</button>
      <button class="add-category-button" @click="toggleCategoryForm">Adicionar Categoria</button>


      <form v-if="showCategoryForm" @submit.prevent="addCategory" class="category-form">
        <input v-model="newCategory" type="text" placeholder="Nova Categoria" class="form-input" required />
        <button type="submit" class="submit-button">Adicionar Categoria</button>
      </form>


      <form v-if="showImageForm" @submit.prevent="addImage" class="image-form">
        <input v-model="imageUrl" type="text" placeholder="URL da Imagem" class="form-input" required />
        <input v-model="imageTitle" type="text" placeholder="Título da Imagem" class="form-input" required />
        <input v-model="imageText" type="text" placeholder="Texto da Imagem" class="form-input" required />
        <select v-model="imageCategory" class="form-input" required>
          <option disabled value="">Categoria</option>
          <option v-for="filter in filters" :key="filter" :value="filter">
            {{ filterLabel(filter) }}
          </option>
        </select>
        <button type="submit" class="submit-button">Finalizar</button>
      </form>
    </div>

    <div class="container">
      <div class="search-bar-container">
        <input v-model="searchQuery" type="text" placeholder="Pesquisar..." class="search-bar" />
      </div>

      <div class="filterable_cards">
        <div v-for="card in filteredCards" :key="card.id" class="card">
          <img :src="card.image" :alt="card.title" @click="expandImage(card.image)" class="clickable-image" />
          <div class="card_body">
            <h6 class="card_title">{{ card.title }}</h6>
            <p class="card_text">{{ card.text }}</p>
            <button class="delete-button" @click="deleteImage(card)">Deletar</button>
          </div>
        </div>
      </div>


      <div v-if="expandedImage" class="image-modal" @click.self="closeImage">
        <img :src="expandedImage" class="expanded-img" />
        <button class="nav-arrow left-arrow" @click="previousImage">&#60;</button>
        <button class="nav-arrow right-arrow" @click="nextImage">&#62;</button>
        <button class="close-btn" @click="closeImage">X</button>
      </div>


      <button class="scroll-to-top" v-if="showScrollToTop" @click="scrollToTop">Voltar ao Topo</button>
    </div>
  </div>
</template>






<script src="./components/script.js"></script>

<style src="./components/estilo.css" scoped></style>