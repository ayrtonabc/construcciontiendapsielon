const post = [
  { id: 1, title: 'Niezbędne Wskazówki dla Nowych Opiekunów', author: 'Zespół psielon', date: '2024-03-15', status: 'Opublikowany' },
  { id: 2, title: 'Mikroczipy vs Tagi NFC dla Zwierząt', author: 'Dr. Emilia Nowak', date: '2024-03-12', status: 'Opublikowany' },
  { id: 3, title: 'Jak przygotować psa na zimę (Szkic)', author: 'Zespół psielon', date: '2024-07-29', status: 'Szkic' },
];

const orders = [
  { id: 'ORD-123', customer: 'Jan Kowalski', date: '2024-07-28', total: '104.90 zł', status: 'Nowe' },
  { id: 'ORD-124', customer: 'Anna Nowak', date: '2024-07-27', total: '89.90 zł', status: 'Wysłane' },
  { id: 'ORD-125', customer: 'Piotr Wiśniewski', date: '2024-07-26', total: '309.89 zł', status: 'Dostarczone' },
];

const products = [
  { id: 1, name: 'PsioTag - Leśny Mech', price: '89.90 zł', stock: 150, category: 'Tagi NFC' },
  { id: 2, name: 'PsioTag - Morski Turkus', price: '89.90 zł', stock: 120, category: 'Tagi NFC' },
  { id: 3, name: 'Obroża Skórzana Premium', price: '219.99 zł', stock: 50, category: 'Obroże' },
];

const reviews = [
  { id: 1, author: 'Opiekun Budiego', rating: 5, text: 'Obroża psielon jest fantastyczna! Znalazłem Budiego w ciągu kilku minut.', date: '2024-07-26', status: 'Zatwierdzona' },
  { id: 2, author: 'Mama Luny', rating: 4, text: 'Świetny produkt i spokój ducha. Skóra mogłaby być miększa.', date: '2024-07-23', status: 'Zatwierdzona' },
  { id: 3, author: 'Anonim', rating: 2, text: 'Nie działa NFC.', date: '2024-07-29', status: 'Oczekująca' },
]; 


// Placeholder product data
/*  const allProducts = [
  { id: "classic-collar", image: "/img/tags.webp", title: "Klasyczna Obroża", price: "129.99 zł", description: "Nasza najpopularniejsza inteligentna obroża z wbudowaną technologią NFC.", category: "Obroże" },
  { id: "premium-leather", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97", title: "Skóra Premium", price: "219.99 zł", description: "Obroża z prawdziwej skóry o eleganckim designie.", category: "Obroże" },
  { id: "sport-edition", image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd", title: "Edycja Sportowa", price: "179.99 zł", description: "Wodoodporny, wytrzymały design dla aktywnych zwierząt.", category: "Obroże" },
  { id: "nfc-tag-only", image: "https://images.unsplash.com/photo-1611219501989-4db8f913c5a3", title: "Tag NFC psielon", price: "79.99 zł", description: "Dodaj inteligentne funkcje psielon do dowolnej obroży.", category: "Akcesoria" },
  { id: "comfort-harness", image: "https://images.unsplash.com/photo-1591856887413-cffb167145a1", title: "Szelki Komfortowe", price: "199.99 zł", description: "Wygodne szelki z miejscem na tag psielon.", category: "Szelki" },
  { id: "reflective-leash", image: "https://images.unsplash.com/photo-1523434290017-5f3765f8a167", title: "Smycz Odblaskowa", price: "99.99 zł", description: "Wytrzymała smycz z elementami odblaskowymi.", category: "Akcesoria" }
]; */
