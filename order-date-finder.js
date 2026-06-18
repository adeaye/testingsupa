const process = {
    purchase:[],
    order: [
    {
    step:0,
    by: {
    20221: {
    status: 'completed',
    date: '2022-01-01'
    },
    20222: {
    status: 'pending',
    date: '2022-01-02'
    },
    20223: {
    status: 'pending',
    date: '2022-01-03'
    }
    }
    },
    {
    step:1,
    by: {
    20221: {
    status: 'completed',
    date: '2022-01-01'
    },
    20222: {
    status: 'pending',
    date: '2022-01-02'
    },
    20223: {
    status: 'pending',
    date: '2022-01-03'
    }
    }
    }]
}

// Function to get date from last order with completed status
function getLastCompletedOrderDate(processData) {
    // Get the last order (highest step number)
    const lastOrder = processData.order[processData.order.length - 1];

    // Find the entry with completed status in the last order
    for (const key in lastOrder.by) {
        if (lastOrder.by[key].status === 'completed') {
            return lastOrder.by[key].date;
        }
    }

    // Return null if no completed status found
    return null;
}

// Alternative approach: Get the most recent completed order date across all steps
function getLatestCompletedOrderDate(processData) {
    let latestDate = null;
    let latestTimestamp = 0;

    // Go through all orders from last to first
    for (let i = processData.order.length - 1; i >= 0; i--) {
        const order = processData.order[i];

        // Check each entry in the 'by' object
        for (const key in order.by) {
            const entry = order.by[key];
            if (entry.status === 'completed') {
                const timestamp = new Date(entry.date).getTime();
                if (timestamp > latestTimestamp) {
                    latestTimestamp = timestamp;
                    latestDate = entry.date;
                }
            }
        }
    }

    return latestDate;
}

// Usage examples:
console.log('Date from last order with completed status:', getLastCompletedOrderDate(process));
console.log('Latest completed order date across all steps:', getLatestCompletedOrderDate(process));

// Export functions for reuse
module.exports = { getLastCompletedOrderDate, getLatestCompletedOrderDate };
