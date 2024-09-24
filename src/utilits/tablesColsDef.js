import Icon from "../components/shared/Icon";
import SwitchButton from "../components/shared/SwitchButton";
import MemberPhoto from '../assets/images/m.png'
const teamsCols = [
    {
        title: 'No.',
        dataIndex: 'id',
        key: 'userId',
        width: '5%',
        render: (id, record, index) => {
            ++index
            return (
                <p
                    className={`${index === 1 ? 'bg-[#54A967]' : 'bg-[#868686]'}
                        text-white w-[37px] rounded-[5px] text-center
                    `}>
                    {index}
                </p>
            );
        },
    },
    {
        title: 'Photo',
        dataIndex: 'photo',
        key: 'photo',
        width: '5%',
        render: (photo) => {
            return <img src={photo ? photo : MemberPhoto} width={50} height={50} alt="Member" />;
        },
    },
    {
        title: 'Name',
        dataIndex: 'fullName',
        key: 'fullName',
        width: '15%',
        render: (text) => {
            return (
                <p className="text-[#3E3E3E] flex-grow rounded-[15px] text-center bg-[#e6e6e6] py-2 px-4 font-abel text-[18px]">
                    {text}
                </p>
            );
        },
    },
    {
        title: 'Role',
        dataIndex: 'roleName',
        key: 'roleName',
        width: '15%',
        render: (text) => {
            return (
                <p className="text-[#3E3E3E] flex-grow rounded-[15px] text-center bg-[#e6e6e6] py-2 px-4 font-abel text-[18px]">
                    {text}
                </p>
            );
        },
    },
    {
        title: 'Status',
        dataIndex: 'statusName',
        key: 'statusName',
        width: '15%',
        render: (id, record, index) => {
            if (record.roleName.toLowerCase() === 'admin') return;

            return (
                <div
                    className={`flex items-center justify-between py-2 px-4 ${id === 'Active' ? 'bg-[#e8ffed]' : 'bg-[#ffebe8]'
                        } rounded-[15px]`}>
                    <p className="text-[#3E3E3E] flex-grow rounded-[15px] font-abel text-[18px]">
                        {id}
                    </p>
                    <SwitchButton />
                </div>
            );
        },
    },
    {
        title: 'Remove',
        dataIndex: 'remove',
        key: 'remove',
        width: '5%',
        render: (id, record, index, remove) => {
            if (record.roleName.toLowerCase() === 'admin') return;
            return (
                <button
                    // onClick={remove}
                    className="w-full h-full flex items-center justify-center">
                    <Icon name={'remove'} />
                </button>
            );
        },
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        width: '5%',
        render: (id, record, index, remove) => {
            if (record.roleName.toLowerCase() === 'admin') return;

            return (
                <button className="bg-gradient-blend w-[40px] h-[40px] flex items-center justify-center rounded-full shadow-lg">
                    <Icon name={'edit'} />
                </button>
            );
        },
    },
];





export { teamsCols }