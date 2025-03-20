document.addEventListener("DOMContentLoaded", () => {
  const orderSelect = document.getElementById("order");
  const isReadSelect = document.getElementById("isRead");
  const applyFiltersButton = document.getElementById("applyFilters");
  const messageList = document.getElementById("messageList");
  const notification = document.getElementById("notification");

  const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "UTC",
  });

  const showNotification = (message) => {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 5000);
  };

  const loadMessages = async () => {
    const order = orderSelect.value;
    const isRead = isReadSelect.value;

    try {
      const response = await fetch(
        `/api/questions/?order=${order}&isAnswered=${isRead}`
      );
      const messages = await response.json();

      messageList.innerHTML = "";
      messages.forEach((message) => {
        const li = document.createElement("li");
        li.innerHTML = `
           <div><strong>Покупатель:</strong> ${message.id}</div>
           <div><strong>Дата:</strong> ${formatter.format(
             new Date(message.createdDate)
           )}</div>
           <div><strong>Вопрос:</strong> ${message.text}</div>
           <div>
             <strong>Ответ:</strong>           
              ${
                message?.answer
                  ? `<p>${message.answer.text}</p>
                <p>${formatter.format(new Date(message.answer.createDate))}</p>
                `
                  : `
                  <button class="autoQuestion" data-id=${message.id}>Автоответ</button>
                  `
              }            
           </div>
         `;
        messageList.appendChild(li);
      });
      const autoQuestionButtons = document.querySelectorAll(".autoQuestion");
      autoQuestionButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const id = button.getAttribute("data-id");
          try {
            const response = await fetch(`/api/questions/auto/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const result = await response.json();
            showNotification(`ВОПРОС: ${result.question}
              ОТВЕТ: ${result.answer}`);
          } catch (error) {
            console.error("Ошибка при отправке автоответа:", error);
          }
        });
      });
    } catch (error) {
      console.error("Ошибка при загрузке сообщений:", error);
    }
  };

  applyFiltersButton.addEventListener("click", loadMessages);

  loadMessages();
});
