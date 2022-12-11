// @parameter : DateObject , timeLimit in minutes
const timeValidation = (time, limit) => {
  const timeDifference = (Date.now() - time.getTime()) / 1000;
  return timeDifference <= limit * 60;
};

export default timeValidation;
