import { mount } from '@vue/test-utils'
import Users from '../../Login/Login.vue'
describe('Prueba unitaria de Perfil: ',()=>{

    test('insercion de datos edit perfil',()=>{
        const taskName ='Username'
        const wrapper = mount(Users)
        const textInput = wrapper.find('input[type="text"] ')
        textInput.setValue('user')
        expect(wrapper.find('input[type="text"]').element.value).toBe('user')

        expect(wrapper.html()).toContain(taskName);
    });
});
describe('Prueba unitaria de editperfil 2: ',()=>{

    test('insercion de datos 2',()=>{
        const taskName ='Password'
        const wrapper = mount(Users)

        const textInput2 = wrapper.find('input[type="password"]')
        textInput2.setValue('pass')
        expect(wrapper.find('input[type="password"]').element.value).toBe('pass')
        expect(wrapper.html()).toContain(taskName);
    });
});