import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

function Chatbot() {
  const theme = {
    background: "#C9FF8F",
    headerBgColor: "#197B22",
    headerFontSize: "20px",
    botBubbleColor: "#0F3789",
    headerFontColor: "white",
    botFontColor: "white",
    userBubbleColor: "#FF5733",
    userFontColor: "white",
  };
  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to ShopKaro",
      trigger: "Ask Name",
    },
    {
      id: "Ask Name",
      message: "Please enter your name",
      trigger: "waiting1",
    },
    {
      id: "waiting1",
      user: true,
      trigger: "Name",
    },
    {
      id: "Name",
      message: "Hi {previousValue}, please select your issue",
      trigger: "issues",
    },
    {
      id: "issues",
      options: [
        {
          value: "Order",
          label: "Order related issue",
          trigger: "Order",
        },
        {
          value: "Payment",
          label: "Payment related issue",
          trigger: "Payment",
        },
        {
          value: "Other Issue",
          label: "Select for Other issues",
          trigger: "Other Issue",
        },
      ],
    },
    {
      id: "Order",
      message: "Thanks for telling your order issue",
      trigger: "OrderIssue",
    },
    {
      id: "Payment",
      message: "Thanks for telling your payment issue",
      trigger: "PaymentIssue",
    },
    {
      id: "Other Issue",
      message: "Thanks for telling your other issues",
      trigger: "OtherIssue",
    },
    {
      id: "OrderIssue",
      message:
        "Follow steps 1.Click User > Dashboard step --> 2.Click Orders --> step 3.Click on your order",
      end: true,
    },
    {
      id: "PaymentIssue",
      message:
        "Follow steps 1.Click User > Dashboard step --> 2.Click Orders --> step 3.Click on your order step4.Check payment status",
      end: true,
    },
    {
      id: "OtherIssue",
      message: "Thanks for your issue we will contact to you later",
      end: true,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} />
    </ThemeProvider>
  );
}

export default Chatbot;
