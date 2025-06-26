const members = [
  {
    name: "Lê Thanh Tâm",
    img: "images/tam.png",
    link: "portfolio/thanhhtam"
  },
  {
    name: "Đinh Thị Thu Trà",
    img: "images/tra.jpg",
    link: "portfolio/tra/index.html"
  },
  {
    name: "Nguyễn Triều Dương",
    img: "images/duong.jpg",
    link: "portfolio/duong"
  },
  {
    name: "Nguyễn Hữu Thắng",
    img: "images/thang.jpg",
    link: "portfolio/thang/portfolio.html"
  }
];

let currentIndex = 0;
const cardContainer = document.getElementById("member-card");

function renderMember(index) {
  const member = members[index];
  cardContainer.innerHTML = `
    <img src="${member.img}" alt="${member.name}">
    <h2>${member.name}</h2>
    <a href="${member.link}" class="btn">More About</a>
  `;
}

function changeMember(nextIndex, direction) {
  const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
  const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

  cardContainer.classList.remove('active');
  cardContainer.classList.add(outClass);

  setTimeout(() => {
    currentIndex = (nextIndex + members.length) % members.length;
    renderMember(currentIndex);

    cardContainer.classList.remove(outClass);
    cardContainer.classList.add(inClass);

    setTimeout(() => {
      cardContainer.classList.remove(inClass);
      cardContainer.classList.add('active');
    }, 50);
  }, 400); 
}

document.getElementById("prevBtn").addEventListener("click", () => {
  changeMember(currentIndex - 1, 'prev');
});

document.getElementById("nextBtn").addEventListener("click", () => {
  changeMember(currentIndex + 1, 'next');
});

window.onload = () => {
  renderMember(currentIndex);
  cardContainer.classList.add('active');
};

const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});
setInterval(() => {
  changeMember(currentIndex + 1, 'next');
}, 10000); 

