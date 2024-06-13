const payFailed = async (req, res) => {
  return res.redirect(`${process.env.fRONTEND_URL}/failed`);
};

module.exports = payFailed;
