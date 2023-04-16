import { mount } from '@vue/test-utils'
import Login from './Login.vue'
describe('Prueba unitaria de login: ',()=>{

    test('insercion de datos',()=>{
        const taskName ='Username'
        const wrapper = mount(Login)
        const textInput = wrapper.find('input[type="text"]')
        textInput.setValue('user')
        expect(wrapper.find('input[type="text"]').element.value).toBe('user')

        expect(wrapper.html()).toContain(taskName);
    });
});
describe('Prueba unitaria de login 2: ',()=>{

    test('insercion de datos 2',()=>{
        const taskName ='Password'
        const wrapper = mount(Login)

        const textInput2 = wrapper.find('input[type="password"]')
        textInput2.setValue('pass')
        expect(wrapper.find('input[type="password"]').element.value).toBe('pass')
        expect(wrapper.html()).toContain(taskName);
    });
});