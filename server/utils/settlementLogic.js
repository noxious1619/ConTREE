// (Utility that transforms pool.users → payers/receivers with upiId preserved)

export function calculateSimpleSettlement(users = []) {
  if (!Array.isArray(users) || users.length === 0) {
    return { payers: [], receivers: [] };
  }

  // total and share
  const total = users.reduce((s, u) => s + (Number(u.amount) || 0), 0);
  const share = total / users.length;

  const payers = [];
  const receivers = [];

  users.forEach(u => {
    const amt = Number(u.amount) || 0;
    const diff = +(amt - share); // positive => overpaid (receiver), negative => underpaid (payer)

    if (diff < -0.005) { // underpaid -> needs to pay
      payers.push({
        name: u.name,
        upiId: u.upiId || "",
        amount: Number((share - amt).toFixed(2)),
        status: "pending"
      });
    } else if (diff > 0.005) { // overpaid -> should receive
      receivers.push({
        name: u.name,
        upiId: u.upiId || "",
        amount: Number((amt - share).toFixed(2)),
        status: "pending"
      });
    }
    // if diff approx 0, ignore
  });

  return { payers, receivers };
}
