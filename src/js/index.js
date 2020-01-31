import '../css/style.css';
'use strict';
window.onload = function () {

  var listingElements = ['Товар-1', 'Товар-2', 'Товар-3', 'Товар-1', 'Товар-2'];
  var storeElements = [];

  function updateUI() {
    let storeSelect = document.querySelector('.store-select');
    let listingSelect = document.querySelector('.listing-select');
    storeSelect.innerHTML = '';
    listingSelect.innerHTML = '';

    for (var i = 0; i < listingElements.length; i++) {
      let newOption = document.createElement('option');
      newOption.innerText = listingElements[i];
      listingSelect.append(newOption);
    }

    for (i = 0; i < storeElements.length; i++) {
      let newOption = document.createElement('option');
      newOption.innerText = storeElements[i];
      storeSelect.append(newOption);
    }
  }
  updateUI();

  function capitalizeFirstLetter(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1));
  }

  function addToListingElements(element) {
    element = capitalizeFirstLetter(element.trim());
    listingElements.push(element);
  }

  function addToStoreElements(element) {
    let elementPosition = listingElements.indexOf(element);
    if (elementPosition > -1) {
      storeElements.push(element);
      listingElements.splice(elementPosition, 1);
    }
  }

  function deleteItem(flag, elementText) {
    if (flag === 'listing') {
      let elementPosition = listingElements.indexOf(elementText);
      if (elementPosition > -1) {
        listingElements.splice(elementPosition, 1);
      }
    }
    else if (flag === 'store') {
      let elementPosition = storeElements.indexOf(elementText);
      if (elementPosition > -1) {
        storeElements.splice(elementPosition, 1);
      }
    }
  }

  function sortStore() {
    storeElements.sort();
    updateUI();
  }

  function deleteAll() {
    listingElements = [];
    storeElements = [];
    updateUI();
  }

  var clearAllButton = document.querySelector('#clear-all-button');
  clearAllButton.onclick = function () {
    deleteAll();
    updateUI();
  };

  var deleteElementButton = document.querySelector('#delete-element-button');

  deleteElementButton.onclick = function () {
    var selectedOption = document.querySelector('select option:checked');
    if (selectedOption) {
      if (selectedOption.closest('.listing-select')) {
        deleteItem('listing', selectedOption.innerText);
      } else if (selectedOption.closest('.store-select')) {
        deleteItem('store', selectedOption.innerText);
      }
      updateUI();
    }
  };

  var addToListingButton = document.querySelector('#add-to-listing-button');

  addToListingButton.onclick = function () {
    var productName = window.prompt('Добавьте товар, пожалуйста:', '');
    if (productName) {
      addToListingElements(productName);
      updateUI();
    }
  };

  var addToStoreButton = document.querySelector('#add-button');

  addToStoreButton.onclick = function () {
    var selectedOption = document.querySelector('.listing-select option:checked');
    addToStoreElements(selectedOption.innerText);
    updateUI();
  };

  var sortStoreButton = document.querySelector('#sort-store-button');

  sortStoreButton.onclick = function () {
    sortStore();
    updateUI();
  };
};