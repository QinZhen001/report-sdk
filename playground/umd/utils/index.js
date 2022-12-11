const mockReject = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('something bad happened'));
    }, 1000);
  });
};
