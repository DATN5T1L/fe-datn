'use client'
import Button from "../component/btnComponent"

const Demo: React.FC = () => {
    return (
        <>
            <table style={{ borderCollapse: 'collapse' }}>
                <tbody>
                    <tr style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
                        <td style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Button type={'secondery'} status={'default'} >
                                mua khóa học
                            </Button>
                            <Button status={'hover'} hover={true} hoverType={'default'} >
                                mua khóa học
                            </Button>
                            <Button status={'noBorder'} hoverType={'default'}>
                                mua khóa học
                            </Button>
                            <Button status={'disable'} >
                                mua khóa học
                            </Button>

                            <Button size={`S`} type={'secondery'} status={'default'} >
                                mua khóa học
                            </Button>
                            <Button size={`S`} status={'hover'} >
                                mua khóa học
                            </Button>
                            <Button size={`S`} status={'noBorder'} >
                                mua khóa học
                            </Button>
                            <Button size={`S`} status={'disable'} >
                                mua khóa học
                            </Button>
                        </td>
                        <td style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Button type={'premary'} status={'default'} >
                                mua khóa học
                            </Button>
                            <Button type={'premary'} status={'hover'} hover={true} hoverType={'default'} >
                                mua khóa học
                            </Button>
                            <Button type={'premary'} status={'noBorder'} hoverType={'other'}>
                                mua khóa học
                            </Button>
                            <Button type={'premary'} status={'disable'} >
                                mua khóa học
                            </Button>

                            <Button type={'premary'} size={`S`} status={'default'} >
                                mua khóa học
                            </Button>
                            <Button type={'premary'} size={`S`} status={'hover'} >
                                mua khóa học
                            </Button>
                            <Button type={'premary'} size={`S`} status={'noBorder'} >
                                mua khóa học
                            </Button>
                            <Button type={'premary'} size={`S`} status={'disable'} >
                                mua khóa học
                            </Button>
                        </td>
                        <td>
                            chức năng:
                            <br />
                            chọn kiểu màu = ' type: 'secondery' | 'premary'; '
                            <br />
                            chọn kích thước = ' size: 'S' | 'M'; '
                            <br />
                            chọn trạng thái = ' status: 'default' | 'disable' | 'hover' | 'noBorder'; '
                            <br />
                            chọn ẩn hiện icon left = ' leftIcon: boolean; '
                            <br />
                            chọn ẩn hiện icon right = ' rightIcon: boolean; '
                            <br />
                            chọn hướng của arrow = ' chevron: 1 | 2 | 3 | 4; '
                            <br />
                            chọn bật tắt hover = ' hover: boolean; '
                            <br />
                            chọn kiểu hover = ' hoverType: 'default' | 'other'; '
                            <br />
                            chọn kiểu button = ' typeButton: 'btn' | 'sm' | 'rs'; '
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}

export default Demo