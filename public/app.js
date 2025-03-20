document.addEventListener("DOMContentLoaded", () => {
  const orderSelect = document.getElementById("order");
  const isReadSelect = document.getElementById("isRead");
  const applyFiltersButton = document.getElementById("applyFilters");
  const messageList = document.getElementById("messageList");

  const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "UTC",
  });

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
                  : ""
              }            
           </div>
         `;
        messageList.appendChild(li);
      });
    } catch (error) {
      console.error("Ошибка при загрузке сообщений:", error);
    }
  };

  applyFiltersButton.addEventListener("click", loadMessages);

  loadMessages();
});
