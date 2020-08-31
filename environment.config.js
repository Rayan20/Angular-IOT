module.exports = {
    env: {
        name: "local",
        aws_region: 'us-east-1',

    },
    iot: {},
    encryption: {
        key: 'x&-{0p7yE#x7}^a',
    },

    nodeJS: {
        enableCluster: false
    },
    db: {
        host: "ec2-107-20-15-85.compute-1.amazonaws.com",
        user: "ltzokpmatnuwuj",
        password: "46ae6289cef9041f1e96196480c53073d6334b94e31c75e5d2f50ab324e0a0eb",
        port: "5432",
        database: "d5b73v5prj475i",
        debug: true,
    },


};
