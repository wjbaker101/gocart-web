export default defineNuxtPlugin((app) => {
    app.vueApp.directive('focus', {
        mounted(element) {
            element.focus();
        },
    });
});